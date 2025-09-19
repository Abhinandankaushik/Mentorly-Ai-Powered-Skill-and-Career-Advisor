import React from 'react';

const Card = ({ card, onClick }) => {
  return (
    <button
      onClick={() => onClick(card.id)}
      className="group relative flex-shrink-0 w-64 h-72 rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-purple-500/30  focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 mx-4"
    >
      <img
        src={card.imageUrl}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 opacity-0 invisible group-hover:opacity-80 flex justify-center items-center group-hover:visible transition-all duration-200 bg-orange-400 text-center"><span className='text-3xl text-white font-bold bg-clip-text bg-transparent mt-40'>{card.title}</span></div>
    </button>
  );
};

export default Card;