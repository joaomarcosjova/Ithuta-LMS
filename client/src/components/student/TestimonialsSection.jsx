import React from "react";
import { dummyEvents } from "../../assets/assets";
import { useUser, useClerk } from "@clerk/clerk-react";

const EventsSection = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const handleEventClick = (event) => {
    if (!user) {
      openSignIn(); // Same logic as "Começar"
    } else {
      window.open(event.ctaLink, "_blank"); // Redirect to event page
    }
  };

  return (
    <section className="pb-16 px-6 md:px-0 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Eventos</h2>
      <p className="text-gray-500 md:text-base max-w-2xl mx-auto">
        Participe de experiências únicas criadas para transformar sua jornada de aprendizado.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-12 justify-center">
        {dummyEvents.map((event, index) => (
          <div
            key={index}
            className="mx-auto max-w-sm border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white flex flex-col"
          >
            <div className="flex justify-center">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-6 flex flex-col flex-1 text-left">
              <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{event.date}</p>

              <div className="mt-4 text-sm space-y-1 text-gray-600">
                <p><span className="font-medium">📍 Local:</span> {event.location}</p>
                <p><span className="font-medium">🎁 Prêmios:</span> {event.prize}</p>
                <p><span className="font-medium">👤 Organizador:</span> {event.organizer}</p>
              </div>

              <p className="mt-4 text-gray-600 text-sm flex-1">{event.description}</p>

              <button
                onClick={() => handleEventClick(event)}
                className="mt-6 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                {event.ctaText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
