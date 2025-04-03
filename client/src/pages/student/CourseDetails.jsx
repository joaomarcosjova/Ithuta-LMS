import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    currency,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    backendUrl,
    userData,
    getToken,
  } = useContext(AppContext);

  // Fetch course data
  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/${id}`);
      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle course enrollment
  const enrollCourse = async () => {
    try {
      if (!userData) {
        return toast.warn("Faça login para se inscrever!");
      }
      if (isAlreadyEnrolled) {
        return toast.warn("Já adquirido");
      }

      const token = await getToken();

      // Check if the course is free (100% discount)
      const finalPrice =
        courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100;

      if (finalPrice === 0) {
        // Directly enroll user in free course
        const { data } = await axios.post(
          `${backendUrl}/api/user/enroll-free`,
          { courseId: courseData._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          toast.success("Curso gratuito adquirido com sucesso!");
          setIsAlreadyEnrolled(true); // Mark as enrolled
        } else {
          toast.error(data.message);
        }
      } else {
        // Proceed with payment for non-free courses
        const { data } = await axios.post(
          `${backendUrl}/api/user/purchase`,
          { courseId: courseData._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          window.location.replace(data.session_url); // Redirect to payment
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>

        {/* Left column - Course details */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>

          {/* Course structure */}
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Estrutura do Curso</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div className="border border-gray-300 bg-white mb-2 rounded" key={index}>
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="down_arrow_icon"
                      />
                      <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} Aulas - {calculateChapterTime(chapter)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Course pricing and enrollment */}
        <div className="max-w-course-card z-10 shadow-custom-card bg-white min-w-[300px] sm:min-w-[420px]">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="courseThumbnail" />
          )}

          <div className="p-5">
            {/* Price section */}
            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency} {(courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">{currency} {courseData.coursePrice}</p>
            </div>

            {/* Enrollment button */}
            <div>
              {isAlreadyEnrolled ? (
                <p className="md:mt-6 mt-4 w-full py-3 rounded text-center bg-blue-600 text-white font-medium">
                  Você já está inscrito
                </p>
              ) : (
                <button
                  onClick={enrollCourse}
                  className="md:mt-6 mt-4 w-full py-3 rounded text-center bg-blue-600 text-white font-medium"
                >
                  {courseData.discount === 100 ? "Curso Grátis" : "Inscreva-se"}
                </button>
              )}
            </div>

            {/* Redirect to My Enrollments */}
            {isAlreadyEnrolled && (
              <Link to="/my-enrollments">
                <p className="md:mt-6 mt-4 w-full text-center py-3 rounded bg-blue-600 text-white font-medium">
                  Cursos adquiridos
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
