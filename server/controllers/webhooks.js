import paypal from "@paypal/paypal-server-sdk";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

const environment = new paypal.core.LiveEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

export const handlePayPalWebhook = async (req, res) => {
  try {
    const event = req.body;

    if (!event || !event.event_type) {
      return res.status(400).json({ success: false, message: "Invalid webhook payload" });
    }

    const { event_type, resource } = event;

    if (event_type === "CHECKOUT.ORDER.APPROVED") {
      const purchaseId = resource.custom_id;
      const purchase = await Purchase.findById(purchaseId);
      if (!purchase) return res.status(404).json({ success: false, message: "Purchase not found" });

      purchase.status = "success";
      await purchase.save();

      const user = await User.findById(purchase.userId);
      const course = await Course.findById(purchase.courseId);

      if (user && course) {
        if (!user.enrolledCourses.includes(course._id)) {
          user.enrolledCourses.push(course._id);
          await user.save();
        }
        if (!course.enrolledStudents.includes(user._id)) {
          course.enrolledStudents.push(user._id);
          await course.save();
        }
      }

      return res.status(200).json({ success: true });
    }

    if (event_type === "PAYMENT.CAPTURE.DENIED" || event_type === "PAYMENT.CAPTURE.REFUNDED") {
      const purchaseId = resource.custom_id;
      const purchase = await Purchase.findById(purchaseId);
      if (purchase) {
        purchase.status = "failed";
        await purchase.save();
      }
      return res.status(200).json({ success: true });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
