import React from "react";
import { motion } from "framer-motion";

import { Card } from "src/types/types";

interface CardComponentProps {
  card: Card;
  handleCardClick: (card: Card) => void;
}

const CardComponentGame: React.FC<CardComponentProps> = ({
  card,
  handleCardClick,
}) => {
  const defaultAnimation = {
    x: `calc(${card.position.x}vw - 85px)`,
    y: `${card.position.y}vh`,
    opacity: 1,
    rotate: card.position.angle,
  };

  const centerAnimation = {
    x: `calc(90vw - 50px)`,
    y: `calc(50vh - 50px)`,
    opacity: 1,
    rotate: 0,
  };

  return (
    <motion.div
      id="cardComponentGame"
      initial={{
        x: `calc(50vw - 85px)`,
        y: `110vh`,
        opacity: 1,
      }}
      animate={card.isAnimating ? centerAnimation : defaultAnimation}
      transition={
        card.isAnimating
          ? {
              type: "spring",
              stiffness: 100,
              damping: 25,
              delay: 0,
            }
          : {
              type: "spring",
              stiffness: 100,
              damping: 25,
              delay: card.id * 0.1,
            }
      }
      style={{
        pointerEvents: card.isFlipped ? "none" : "initial",
        scale: card.isAnimating ? "1.5" : "1",
        zIndex: card.isAnimating ? "20" : "initial",
      }}
      onClick={() => handleCardClick(card)}
    >
      <motion.div
        className="card-content"
        animate={{
          rotateY: card.isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        <motion.div className="card-front" />
        <motion.div
          className="card-back"
          style={{
            backgroundImage: `url(/images/cardImages/${card.image})`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default React.memo(CardComponentGame, (prevProps, nextProps) => {
  return prevProps.card === nextProps.card;
});
