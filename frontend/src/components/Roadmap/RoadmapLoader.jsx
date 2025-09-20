import React from 'react';

const RoadmapLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-white animate-fade-in">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-orange-500"
            stroke="currentColor"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          />
          <circle
            className="text-brand-primary/80 animate-spin"
            style={{ transformOrigin: '50% 50%'}}
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="120"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          />
        </svg>
      </div>
      <p className="mt-4 text-lg font-semibold">Building Your Roadmap...</p>
      <p className="text-sm">The AI is charting your course to success.</p>
    </div>
  );
};

export default RoadmapLoader;