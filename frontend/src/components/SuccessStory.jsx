import React from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessStoriesLogos() {
  const navigate = useNavigate();

  const stories = [
    { id: 1, logo: "/logos/startup-canada.png", link: "/success-stories/startup-canada" },
    { id: 2, logo: "/logos/basketball-australia.png", link: "/success-stories/basketball-australia" },
    { id: 3, logo: "/logos/princes-trust-canada.png", link: "/success-stories/princes-trust-canada" },
    { id: 4, logo: "/logos/mentorly-featured.png", link: "/success-stories/mentorly-featured" },
    //{ id: 5, logo: "/logos/mentorly-satisfaction.png", link: "/success-stories/satisfaction" },
    //{ id: 6, logo: "/logos/mentorly-efficiency.png", link: "/success-stories/efficiency" },
    // Add up to 10 logos
  ];

  return (
    <section className="py-2 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-8">Success Stories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => navigate(story.link)}
              className="cursor-pointer bg-gray-800 p-4 rounded-xl shadow-lg transform transition hover:scale-105"
            >
              <img
                src={story.logo}
                alt={`Logo of success story #${story.id}`}
                className="mx-auto h-16 object-contain filter drop-shadow-[0_0_8px_rgba(59,130,246,0.7)] hover:drop-shadow-[0_0_16px_rgba(59,130,246,0.9)] transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
