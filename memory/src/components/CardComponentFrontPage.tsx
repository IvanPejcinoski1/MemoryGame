import { motion } from "framer-motion";
import React, { useContext } from "react";
import { mainContext } from "src/context/mainContext";
import { FrontPageCard } from "src/types/types";

interface CardProps {
  card: FrontPageCard;
}

const CardComponent: React.FC<CardProps> = ({ card }) => {
  const { clearTable } = useContext(mainContext);

  return (
    <motion.div
      className={`cardComponentFrontPage ${
        clearTable ? (card.position.x < 50 ? "left" : "right") : ""
      }`}
      initial={{
        x: `calc(50vw - 85px)`,
        y: `100vh`,
        opacity: 1,
      }}
      animate={{
        x: `calc(${card.position.x}vw - 85px)`,
        y: `${card.position.y}vh`,
        opacity: 1,
        rotate: card.position.angle,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 25,
        delay: card.id * 0.1,
      }}
      style={{
        backgroundImage: `url(/images/cardImages/${card.image})`,
      }}
    />
  );
};

export default CardComponent;
