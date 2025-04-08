import React, { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { dummyMentors } from "../../assets/assets";
import { FaStar } from "react-icons/fa";
import { getCalApi } from "@calcom/embed-react";
import Footer from "../../components/student/Footer";

const MentorsList = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMentors, setFilteredMentors] = useState(dummyMentors);

  useEffect(() => {
    const calSetup = async () => {
      const cal = await getCalApi({ namespace: "mentors" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    };
    calSetup();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = dummyMentors.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(term) ||
        mentor.subjects.some((subject) =>
          subject.toLowerCase().includes(term)
        )
    );
    setFilteredMentors(filtered);
  }, [searchTerm]);

  const handleUnauthenticatedClick = () => {
    openSignIn();
  };

  return (
    <>
      <section className="px-4 sm:px-6 lg:px-12 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium text-gray-800">Encontre seu Mentor</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Filtre mentores por nome ou assunto abaixo e agende uma sessão individual com especialistas.
          </p>
        </div>

        <div className="mb-10 max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome ou assunto..."
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMentors.map((mentor, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
            >
              <div className="md:w-1/3 p-3 flex justify-center items-center">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="rounded-xl w-full h-64 sm:h-64 md:h-full object-cover"
                />
              </div>

              <div className="flex-1 p-6 text-left flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{mentor.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {mentor.description.length > 160
                      ? `${mentor.description.slice(0, 160)}...`
                      : mentor.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {mentor.subjects.slice(0, 10).map((subject, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-xl"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-sm text-gray-500 gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="text-gray-800 font-semibold">
                      {mentor.rating.toFixed(1)}
                    </span>
                    <span>({mentor.reviews} avaliações)</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="text-lg font-semibold text-gray-800">
                    {mentor.price.toFixed(0)} USD / hora
                  </div>
                  {user ? (
                    <button
                      className="min-w-[140px] bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl transition font-semibold"
                      data-cal-namespace="mentors"
                      data-cal-link="ithuta/mentors"
                      data-cal-config='{"layout":"month_view"}'
                    >
                      Reservar
                    </button>
                  ) : (
                    <button
                      onClick={handleUnauthenticatedClick}
                      className="min-w-[140px] bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl transition font-semibold"
                    >
                      Reservar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MentorsList;
