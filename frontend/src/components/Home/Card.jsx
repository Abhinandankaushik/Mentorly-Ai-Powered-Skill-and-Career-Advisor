import React from 'react';

const Card = ({ card, onClick }) => {
  return (
    <button
      onClick={() => onClick(card.id)}
      className="group relative flex-shrink-0 w-64 h-80 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 mx-4"
    >
      <img
        src={card.imageUrl}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="relative h-full flex flex-col justify-end p-6 text-white text-left">
        <h3 className="text-2xl font-bold mb-2 transition-transform duration-300 translate-y-8 group-hover:translate-y-0">
          {card.title}
        </h3>
        <p className="text-sm opacity-0 transition-all duration-300 delay-100 group-hover:opacity-100">
          {card.description}
        </p>
      </div>
    </button>
  );
};

export default Card;