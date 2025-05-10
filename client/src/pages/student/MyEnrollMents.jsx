import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const MyEnrollments = () => {
  const {
    navigate,
    enrolledCourses,
    calculateCourseDuration,
    userData,
    fetchUserEnrolledCourses,
    backendUrl,
    getToken,
    calculateNoOfLectures,
  } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([]);

  const getCourseProgress = async () => {
    try {
      const token = await getToken();

      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          let totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;

          return { totalLectures, lectureCompleted };
        })
      );

      setProgressArray(tempProgressArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses();
    }
  }, [userData]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses]);

  if (enrolledCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-10 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Parece que você não está matriculado em nenhum curso</h2>
        <p className="mt-3 text-gray-500 max-w-md">
         Após se inscrever em um curso, você poderá acompanhar seu progresso por aqui.
        </p>
        <Link
          to="/course-list"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
        >
          Descobrir Cursos
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="py-12 px-6 md:px-36 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 mb-10">Meus Cursos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course, index) => {
            const progress = progressArray[index]
              ? Math.floor(
                  (progressArray[index].lectureCompleted * 100) /
                  progressArray[index].totalLectures
                )
              : 0;

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="flex gap-4">
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-32 h-24 object-cover rounded-lg cursor-pointer"
                    onClick={() => navigate("/player/" + course._id)}
                  />
                  <div className="flex-1">
                    <h2
                      className="text-lg font-semibold text-gray-800 cursor-pointer"
                      onClick={() => navigate("/player/" + course._id)}
                    >
                      {course.courseTitle}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Duração: {calculateCourseDuration(course)}
                    </p>
                    <div className="mt-2">
                      <Line
                        percent={progress}
                        strokeWidth={3}
                        strokeColor="#3B82F6"
                        trailColor="#E5E7EB"
                      />
                      <p className="text-sm text-gray-500 mt-1">{progress}% concluído</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {progressArray[index]
                      ? `${progressArray[index].lectureCompleted} de ${progressArray[index].totalLectures} aulas`
                      : "0 aulas"}
                  </span>
                  <button
                    className={`px-4 py-2 rounded text-sm text-white ${
                      progress === 100 ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    onClick={() => navigate("/player/" + course._id)}
                  >
                    {progress === 100 ? "Concluído" : "Continuar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
