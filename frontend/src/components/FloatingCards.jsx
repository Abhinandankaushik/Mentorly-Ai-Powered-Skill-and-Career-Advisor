import React from 'react';
import Card from './Card';
import {cardData} from '../utils/constant'


const FloatingCards = () => {
  const handleCardClick = (id) => {
    const card = cardData.find(c => c.id === id);
    if (card) {
      alert(`You clicked on "${card.title}"!`);
    }
  };

  // Duplicate the data for a seamless loop
  const extendedCardData = [...cardData, ...cardData];

  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-4">
        {extendedCardData.map((card, index) => (
          <Card key={`${card.id}-${index}`} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default FloatingCards;