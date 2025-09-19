import React from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessStoriesLogos() {
  const navigate = useNavigate();

  const stories = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
    "https://randomuser.me/api/portraits/women/6.jpg",
    "https://randomuser.me/api/portraits/men/7.jpg",
    "https://randomuser.me/api/portraits/women/8.jpg"
  ];
  let count = 0;
  return (
    <section className="py-2 bg-white text-black flex justify-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Success Stories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {stories.map((story) => (
            <div className="rounded-full object-cover mr-10 mb-2">
              <img src={story} alt="" className="h-26 rounded-full"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
