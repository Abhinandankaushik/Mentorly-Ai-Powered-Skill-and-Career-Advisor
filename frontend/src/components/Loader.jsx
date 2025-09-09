import React from 'react';

const Loader = () => {
  return (
    <div className="w-full  p-6 bg-white rounded-lg border border-gray-200">
      {/* Main content area */}
      <div className="space-y-4">
        {/* Header line */}
        <div className="relative">
          <div className="h-6 bg-gray-200 rounded animate-pulse backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/30 to-transparent rounded animate-ping"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent rounded animate-pulse delay-150"></div>
        </div>

        {/* Content lines */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <div className={`h-4 bg-gray-200 rounded ${i === 3 ? 'w-3/4' : 'w-full'} animate-pulse backdrop-blur-sm`}></div>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/25 to-transparent rounded animate-ping"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Feature blocks */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {[1, 2].map((i) => (
            <div key={i} className="relative">
              <div className="h-16 bg-gray-200 rounded-lg animate-pulse backdrop-blur-sm"></div>
              <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-400/15 via-gray-500/15 to-gray-400/15 rounded-lg animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
              <div 
                className="absolute inset-0 bg-gradient-to-t from-transparent via-gray-300/20 to-transparent rounded-lg animate-ping"
                style={{ animationDelay: `${i * 0.5}s` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom action area */}
        <div className="mt-6 relative">
          <div className="h-10 bg-gray-200 rounded-full animate-pulse backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/30 to-transparent rounded-full animate-ping delay-300"></div>
          <div className="absolute inset-y-0 left-1/2 w-1 bg-gradient-to-b from-transparent via-gray-500/50 to-transparent animate-pulse delay-500 transform -translate-x-1/2 rounded-full"></div>
        </div>
      </div>

      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 w-2 h-2 bg-gray-400 rounded-full opacity-70 animate-ping delay-700"></div>
        <div className="absolute top-12 right-6 w-1 h-1 bg-gray-500 rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-50 animate-ping delay-1200"></div>
      </div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-gray-400/60 to-transparent transform -translate-y-full" 
             style={{ 
               animation: 'scan 3s ease-in-out infinite',
               animationDelay: '1s'
             }}>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(300%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  );
};

export default Loader;