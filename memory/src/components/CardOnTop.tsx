import React, { useContext } from "react";
import { mainContext } from "src/context/mainContext";
import { FrontPageCard } from "src/types/types";

interface CardProps {
  card: FrontPageCard;
}

const CardComponent: React.FC<CardProps> = ({ card }) => {
  const { devicePixelRatio } = useContext(mainContext);

  return (
    <div
      id="cardOnTop"
      style={{
        backgroundImage: `url(/images/cardImages/${card.image})`,
        height: devicePixelRatio >= 1.25 ? "120px" : "150px",
        width: devicePixelRatio >= 1.25 ? "120px" : "150px",
        top:
          devicePixelRatio >= 1.25 ? "calc(50vh - 70px)" : "calc(50vh - 85px)",
      }}
    ></div>
  );
};

export default CardComponent;
