import React from "react";
import { FrontPageCard } from "src/types/types";

interface CardProps {
  card: FrontPageCard;
}

const CardComponent: React.FC<CardProps> = ({ card }) => {
  return (
    <div
      id="cardOnTop"
      style={{
        backgroundImage: `url(/images/cardImages/${card.image})`,
      }}
    ></div>
  );
};

export default CardComponent;
