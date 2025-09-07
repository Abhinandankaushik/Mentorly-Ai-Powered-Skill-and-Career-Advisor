import React from "react";

export default function HeroSection() {
  return (
    <section className="w-full flex items-center justify-center py-20 px-6">
      <div className="max-w-4xl w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl shadow-2xl p-12 text-center transition-transform transform hover:scale-[1.01] hover:shadow-blue-500/40">
        {/* Headline */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Grow Faster with Mentorly
          </h1>
        </div>

        {/* Subheadline */}
        <div>
          <p className="text-lg sm:text-xl text-blue-100">
            Connect with experts, gain real-world insights, and unlock your full
            potential with personalized mentorship that truly makes a
            difference.
          </p>
        </div>
      </div>
    </section>
  );
}
