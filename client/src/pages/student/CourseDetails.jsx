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
    const { id } = useParams(); // Obtém o ID do curso da URL
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

    // Função para buscar os dados do curso
    const fetchCourseData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/course/${id}`);
            if (data.success) {
                setCourseData(data.courseData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Erro ao carregar curso.");
        }
    };

    // Função para se inscrever no curso
    const enrollCourse = async () => {
        try {
            if (!userData) {
                return toast.warn("Faça login para se inscrever!");
            }
            if (isAlreadyEnrolled) {
                return toast.warn("Você já está inscrito neste curso.");
            }

            const token = await getToken();
            const { data } = await axios.post(
                `${backendUrl}/api/user/purchase`,
                { courseId: courseData._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                // Se for gratuito, adicionar diretamente em "Meus Cursos"
                if (courseData.discount === 100) {
                    setIsAlreadyEnrolled(true);
                    toast.success("Você se inscreveu neste curso gratuitamente!");
                } else {
                    window.location.replace(data.session_url);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Erro ao processar inscrição.");
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

    // Função para expandir/recolher seções do curso
    const toggleSection = (index) => {
        setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return courseData ? (
        <>
            <div className="flex flex-col md:flex-row gap-10 relative items-start justify-between md:px-36 px-8 pt-20 text-left">
                {/* Background */}
                <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>

                {/* Coluna Esquerda */}
                <div className="max-w-xl z-10 text-gray-500">
                    <h1 className="md:text-3xl text-2xl font-semibold text-gray-800">
                        {courseData.courseTitle}
                    </h1>
                    <p className="pt-4 md:text-base text-sm" dangerouslySetInnerHTML={{
                        __html: courseData.courseDescription.slice(0, 200),
                    }}></p>

                    {/* Avaliações e Alunos */}
                    <div className="flex items-center space-x-2 pt-3 text-sm">
                        <p>{calculateRating(courseData)}</p>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <img key={i} className="w-3.5 h-3.5" src={
                                    i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank
                                } alt="star"/>
                            ))}
                        </div>
                        <p className="text-blue-600">({courseData.courseRatings.length} Avaliações)</p>
                        <p>{courseData.enrolledStudents.length} Estudantes</p>
                    </div>

                    {/* Estrutura do Curso */}
                    <div className="pt-8 text-gray-800">
                        <h2 className="text-xl font-semibold">Estrutura do Curso</h2>
                        <div className="pt-5">
                            {courseData.courseContent.map((chapter, index) => (
                                <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                                    <div className="flex items-center justify-between px-4 py-3 cursor-pointer"
                                         onClick={() => toggleSection(index)}>
                                        <div className="flex items-center gap-2">
                                            <img className={`transition-transform ${openSections[index] ? "rotate-180" : ""}`} 
                                                 src={assets.down_arrow_icon} alt="down_arrow_icon"/>
                                            <p className="font-medium">{chapter.chapterTitle}</p>
                                        </div>
                                        <p className="text-sm">{chapter.chapterContent.length} Aulas - {calculateChapterTime(chapter)}</p>
                                    </div>
                                    {/* Lista de Aulas */}
                                    {openSections[index] && (
                                        <ul className="list-disc pl-6 py-2 text-gray-600 border-t border-gray-300">
                                            {chapter.chapterContent.map((lecture, i) => (
                                                <li key={i} className="flex items-center gap-2 py-1">
                                                    <p>{lecture.lectureTitle}</p>
                                                    <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"] })}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Coluna Direita (Detalhes do Curso) */}
                <div className="max-w-sm shadow-md rounded bg-white">
                    {playerData ? (
                        <YouTube videoId={playerData.videoId} opts={{ playerVars: { autoplay: 1 } }} iframeClassName="w-full aspect-video"/>
                    ) : (
                        <img src={courseData.courseThumbnail} alt="courseThumbnail"/>
                    )}
                    <div className="p-5">
                        <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                            {currency} {courseData.discount === 100 ? "Grátis" : 
                            (courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
                        </p>
                        {/* Botão de Inscrição */}
                        <button onClick={enrollCourse} className="mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">
                            {isAlreadyEnrolled ? "Você já está inscrito" : (courseData.discount === 100 ? "Inscrever-se gratuitamente" : "Inscreva-se agora")}
                        </button>
                        {/* Link para Meus Cursos */}
                        {isAlreadyEnrolled && <Link to="/my-enrollments" className="block text-center mt-4 text-blue-500">Meus Cursos</Link>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    ) : <Loading />;
};

export default CourseDetails;
