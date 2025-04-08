import express from "express";
import {
  addUserRating,
  getUserCourseProgress,
  getUserData,
  userEnrolledCourses,
  enrollFreeCourse,
  updateUserCourseProgress
} from "../controllers/userController.js";
import { handlePayPalWebhook } from "../controllers/webhook.js";

const userRouter = express.Router();

userRouter.get("/data", getUserData);
userRouter.get("/enrolled-courses", userEnrolledCourses);
userRouter.post("/enroll-free-course", enrollFreeCourse);
userRouter.post("/update-course-progress", updateUserCourseProgress);
userRouter.post("/get-course-progress", getUserCourseProgress);
userRouter.post("/add-rating", addUserRating);

// ✅ Include webhook route (PayPal)
userRouter.post("/paypal-webhook", handlePayPalWebhook);

export default userRouter;
