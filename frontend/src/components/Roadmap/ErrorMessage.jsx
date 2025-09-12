import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-red-400 p-8 border-2 border-dashed border-red-400/30 rounded-lg animate-fade-in">
      <div className="w-12 h-12 flex items-center justify-center bg-red-400/10 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-300">Oops, something went wrong.</h3>
      <p className="mt-2 text-sm max-w-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;