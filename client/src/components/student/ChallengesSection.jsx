import React from "react";
import { dummyChallenges } from "../../assets/dummyChallenges";

const ChallengesSection = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">💡 Coding Challenges</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg border">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{challenge.title}</h3>
            <p className="text-sm text-gray-600 mb-2"><strong>Dificuldade:</strong> {challenge.difficulty}</p>
            <p className="text-sm text-gray-700 mb-4">{challenge.description}</p>
            <pre className="bg-black text-white text-sm p-3 rounded overflow-x-auto">{challenge.starterCode}</pre>
            <div className="text-xs text-gray-500 mt-2">🧪 {challenge.testCases.length} casos de teste</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChallengesSection;
