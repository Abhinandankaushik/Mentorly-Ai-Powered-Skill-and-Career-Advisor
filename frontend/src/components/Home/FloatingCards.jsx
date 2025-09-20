import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { cardData } from '../../utils/constant';
import useStore from '../../store/responsestore';
import { useNavigate } from "react-router-dom";


const FloatingCards = () => {
  const { addQuestion } = useStore();
  const Navigate = useNavigate();
  const handleCardClick = (id) => {
    const card = cardData.find((c) => c.id === id);
    if (card) {
      addQuestion(`I want to become a professional ${card.title}`);
      Navigate('/chat');
    }
  };

  // Duplicate the data for a seamless loop
  const extendedCardData = [...cardData, ...cardData];

  return (
    <div className="relative w-full overflow-hidden py-8 bg-white floatCards">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] pointer-events-none" />
      <motion.div
        className="flex w-max gap-6 px-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: { repeat: Infinity, repeatType: 'loop', duration: 20, ease: 'linear' },
        }}
        style={{ animationPlayState: 'running' }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {extendedCardData.map((card, index) => (
          <motion.div
            key={`${card.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              card={card}
              onClick={handleCardClick}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 w-72"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FloatingCards;