import React from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { dummyMentors } from "../../assets/assets";
import { FaStar } from "react-icons/fa";

const MentorsSection = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const handleBookMentor = (mentor) => {
    if (!user) {
      openSignIn();
    } else {
      const returnUrl = encodeURIComponent("https://cal.com/ithuta/secret"); // your custom success URL
      const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=marcosjova3@gmail.com&amount=${mentor.price}&currency_code=USD&item_name=Mentoria%20com%20${encodeURIComponent(mentor.name)}&return=${returnUrl}`;
      window.open(paypalUrl, "_blank");
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-16">
      <h2 className="text-3xl font-medium text-gray-800 mb-6 text-center">Encontre seu Mentor</h2>

      <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mt-3 px-4 text-center sm:text-center">
        Encontre os nossos mentores especializados e agende sessões individuais.
        <br className="hidden sm:block" />
        Aprenda com os melhores em programação, design, liderança, preparação para entrevistas e muito mais.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {dummyMentors.map((mentor, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
          >
            <div className="md:w-1/3 p-3 flex justify-center items-center">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="rounded-xl w-full h-48 object-cover md:h-full"
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

              <div className="mt-6">
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {mentor.price.toFixed(2)} USD / hora
                </div>
                <button
                  onClick={() => handleBookMentor(mentor)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition font-semibold"
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MentorsSection;
