import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
import { CourseProgress } from "../models/CourseProgress.js";

// Get users data
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found!" });
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// User enrolled courses
export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId).populate("enrolledCourses");
    res.json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Free course enrollment
export const enrollFreeCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.auth.userId;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.json({ success: false, message: "Usuário ou curso não encontrado." });
    }

    const finalPrice = course.coursePrice - (course.coursePrice * course.discount / 100);

    if (finalPrice > 0) {
      return res.json({ success: false, message: "Este curso não é gratuito." });
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res.json({ success: false, message: "Você já está matriculado neste curso." });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    course.enrolledStudents.push(userId);
    await course.save();

    res.json({ success: true, message: "Inscrição realizada com sucesso!" });
  } catch (error) {
    res.json({ success: false, message: "Erro ao inscrever-se: " + error.message });
  }
};

// Course progress
export const updateUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, lectureId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });

    if (progressData) {
      if (progressData.lectureCompleted.includes(lectureId)) {
        return res.json({ success: true, message: "Aula Concluída" });
      }

      progressData.lectureCompleted.push(lectureId);
      progressData.completed = true;
      await progressData.save();
    } else {
      await CourseProgress.create({
        userId,
        courseId,
        lectureCompleted: [lectureId],
      });
    }

    res.json({ success: true, message: "Progresso Atualizado" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get course progress
export const getUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });
    res.json({ success: true, progressData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add rating
export const addUserRating = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, rating } = req.body;

    if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
      res.json({ success: false, message: "Invalid details" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.json({ success: false, message: "Course Not found!" });

    const user = await User.findById(userId);
    if (!user || !user.enrolledCourses.includes(courseId)) {
      return res.json({ success: false, message: "User has not purchased this course." });
    }

    const existingRatingIndex = course.courseRatings.findIndex((r) => r.userId === userId);
    if (existingRatingIndex > -1) {
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      course.courseRatings.push({ userId, rating });
    }

    await course.save();
    res.json({ success: true, message: "Obrigado pelo feedback" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
