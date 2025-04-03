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

// Constant for courses that are 100% discounted (free)
const FREE_COURSE_DISCOUNT = 100;

const CourseDetails = () => {
  // Get the course ID from the URL parameters
  const { id } = useParams();

  // State variables
  const [courseData, setCourseData] = useState(null); // Stores course details
  const [openSections, setOpenSections] = useState({}); // Stores the state of expanded course sections
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false); // Checks if the user is enrolled
  const [playerData, setPlayerData] = useState(null); // Stores the selected video to play

  // Context variables from AppContext
  const {
    currency,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    backendUrl,
    userData,
    getToken,
  } = useContext(AppContext);

  // Fetch course data from the backend
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

  // Handle course enrollment (either free or paid)
  const enrollCourse = async () => {
    try {
      if (!userData) {
        return toast.warn("Faça login para se inscrever!");
      }
      if (isAlreadyEnrolled) {
        return toast.warn("Já adquirido");
      }

      // Get authentication token for API request
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/purchase`,
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        if (isFreeCourse(courseData)) {
          // If it's a free course, enroll the user immediately
          toast.success("Inscrição realizada com sucesso!");
          setIsAlreadyEnrolled(true);
        } else {
          // Redirect to payment page
          window.location.replace(data.session_url);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch course data when the component mounts
  useEffect(() => {
    fetchCourseData();
  }, []);

  // Check if the user is already enrolled
  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  // Toggle visibility of course sections
  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Determine if a course is free based on discount percentage
  const isFreeCourse = (course) => {
    return (
      course.coursePrice - (course.discount * course.coursePrice) / 100 === 0
    );
  };

  return courseData ? (
    <>
      <div className="flex flex-col md:flex-row gap-10 relative items-start justify-between px-8 md:px-36 pt-20 text-left">
        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-60 bg-gradient-to-b from-cyan-100/70"></div>

        {/* Left Column - Course Overview */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-3xl text-2xl font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p className="pt-4">{courseData.courseDescription.slice(0, 200)}</p>

          {/* Ratings and Reviews */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  className="w-4"
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                />
              ))}
            </div>
            <p className="text-blue-600">({courseData.courseRatings.length} Avaliações)</p>
            <p>{courseData.enrolledStudents.length} Estudantes</p>
          </div>

          {/* Course Content (Chapters) */}
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Estrutura do Curso</h2>
            {courseData.courseContent.map((chapter, index) => (
              <div className="border border-gray-300 bg-white mb-2 rounded" key={index}>
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer"
                  onClick={() => toggleSection(index)}
                >
                  <p className="font-medium">{chapter.chapterTitle}</p>
                  <p>{chapter.chapterContent.length} Aulas - {calculateChapterTime(chapter)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Course Purchase Info */}
        <div className="max-w-md z-10 shadow-lg rounded bg-white min-w-[300px]">
          {playerData ? (
            <YouTube videoId={playerData.videoId} iframeClassName="w-full aspect-video" />
          ) : (
            <img src={courseData.courseThumbnail} alt="courseThumbnail" />
          )}

          <div className="p-5">
            <p className="text-red-500">
              <span className="font-medium">Faltam 3 dias</span> a este preço!
            </p>

            {/* Course Price Section */}
            <div className="flex items-center gap-3 pt-2">
              <p className="text-3xl font-semibold">
                {currency} {(courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
              </p>
              <p className="text-gray-500 line-through">{currency} {courseData.coursePrice}</p>
              <p className="text-gray-500">{courseData.discount}% off</p>
            </div>

            {/* Enrollment Button */}
            <div className="pt-4">
              {isAlreadyEnrolled ? (
                <p className="py-3 rounded text-center bg-blue-600 text-white font-medium">
                  Você já está inscrito
                </p>
              ) : isFreeCourse(courseData) ? (
                <button onClick={enrollCourse} className="w-full py-3 rounded bg-green-600 text-white font-medium">
                  Inscreva-se Grátis
                </button>
              ) : (
                <button onClick={enrollCourse} className="w-full py-3 rounded bg-blue-600 text-white font-medium">
                  Inscreva-se
                </button>
              )}
            </div>

            {/* Free Course Notice */}
            {isFreeCourse(courseData) && (
              <p className="mt-4 w-full text-center py-3 rounded bg-blue-600 text-white font-medium">
                Clique na estrutura do curso
              </p>
            )}

            {/* Course Benefits */}
            <div className="pt-6">
              <h3 className="text-lg font-medium text-gray-800">O que você obtém?</h3>
              <ul className="list-disc pl-4 text-sm text-gray-500">
                <li>Acesso vitalício com atualizações gratuitas.</li>
                <li>Orientação passo a passo e prática do projeto.</li>
                <li>Recursos para download e código-fonte.</li>
                <li>Certificado de conclusão.</li>
              </ul>
            </div>
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
