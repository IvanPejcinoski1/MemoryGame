import React, { useContext, useEffect, useState } from "react";
import CardComponentGame from "src/components/CardComponentGame";
import CardOnTop from "src/components/CardOnTop";
import { Card, Position } from "src/types/types";
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/router";
import { mainContext } from "src/context/mainContext";
import { RiRestartLine } from "react-icons/ri";

interface InGameProps {
  cardsForPlayingProps: Card[];
}

const InGame: React.FC<InGameProps> = ({ cardsForPlayingProps }) => {
  const {
    setClearTable,
    setSlideUp,
    playAgain,
    numberOfGuesses,
    setNumberOfGuesses,
  } = useContext(mainContext);
  const router = useRouter();

  const [cardsForPlaying, setCardsForPlaying] =
    useState<Card[]>(cardsForPlayingProps);

  const [opennedCards, setOpennedCards] = useState<Card[]>([]);
  const [cardOnTopOfDeck, setCardOnTopOfDeck] = useState<Card | null>();
  const [gueseedPairs, setGueseedPairs] = useState<number>(0);

  const handleCardClick = (clickedCard: Card) => {
    setCardsForPlaying((prevCards) =>
      prevCards.map((card) =>
        card.id === clickedCard.id
          ? { ...card, isFlipped: !card.isFlipped }
          : card
      )
    );
    setOpennedCards((prev) => [...prev, { ...clickedCard, isFlipped: true }]);
  };
  console.log(cardsForPlaying);
  console.log(opennedCards.length);

  useEffect(() => {
    if (opennedCards.length == 2) {
      setTimeout(() => {
        setNumberOfGuesses((prev: any) => prev + 1);
      }, 700);

      if (opennedCards[0].name == opennedCards[1].name) {
        setTimeout(() => {
          setCardsForPlaying((prevCards) =>
            prevCards.map((card) =>
              card.id === opennedCards[0].id || card.id === opennedCards[1].id
                ? { ...card, isAnimating: true }
                : card
            )
          );
        }, 1000);
        setTimeout(() => {
          setCardsForPlaying((prevCards) =>
            prevCards.filter(
              (card) =>
                card.id !== opennedCards[0].id && card.id !== opennedCards[1].id
            )
          );
          setCardOnTopOfDeck(opennedCards[0]);
          setOpennedCards([]);
          setGueseedPairs((prev) => prev + 1);
        }, 2000);
      } else {
        setTimeout(() => {
          setCardsForPlaying((prevCards) =>
            prevCards.map((card) =>
              card.isFlipped &&
              (card.id === opennedCards[0].id || card.id === opennedCards[1].id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setOpennedCards([]);
        }, 1500);
      }
    }
  }, [opennedCards, setCardsForPlaying]);

  return (
    <div id="inGame">
      {opennedCards.length === 2 && <div className="fullscreenOverlay" />}
      <div className="grid grid-cols-8 grid-rows-6 gap-4 w-full mx-auto justify-items-start items-center cardContainer text-center">
        {cardsForPlaying.map((card) => (
          <CardComponentGame
            key={card.id}
            card={card}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      <div className="counterDiv">
        <p>
          Number of Guesses <span>{numberOfGuesses}</span>
        </p>
      </div>
      {cardOnTopOfDeck && <CardOnTop card={cardOnTopOfDeck} />}
      <div className="group fixed right-0 top-[130px] transform -translate-y-1/2 bg-[rgba(0,_0,_0,_0.7)] w-32 h-16 rounded-tl-[10px] rounded-bl-[10px] overflow-hidden transition-all duration-300 hover:w-48">
        <div className="flex items-center justify-center h-full">
          <p className="mb-0 text-white inline-block mr-2 text-base whitespace-nowrap pointer-events-none">
            Quit Game?
          </p>

          <IoMdExit
            onClick={() => {
              setSlideUp(false);
              setGueseedPairs(0);
              setNumberOfGuesses(0);
              setClearTable(false);
              router.push("/");
            }}
            style={{
              color: "white",
              fontSize: "50px",
              cursor: "pointer",
            }}
            className="hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300"
          />
        </div>
      </div>
      {gueseedPairs == 24 && (
        <div className=" youWinDiv absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col animate-fadeIn">
          <p className="text-8xl font-bold">
            <span style={{ color: "#FFA500" }}>Y</span>
            <span style={{ color: "#607D8B" }}>o</span>
            <span style={{ color: "#008080" }}>u</span>
            <span> </span>
            <span style={{ color: "#006400" }}>W</span>
            <span style={{ color: "#FFA500" }}>i</span>
            <span style={{ color: "#87CEEB" }}>n</span>
          </p>

          <button
            onClick={async () => {
              setCardOnTopOfDeck(null);
              setGueseedPairs(0);
              setCardsForPlaying([]);
              setNumberOfGuesses(0);
              setCardsForPlaying(await playAgain());
            }}
            className="max-w-fit mx-auto text-white bg-gradient-to-r from-emerald-900 to-emerald-700 text-4xl px-10 py-4 inline-block mt-6 rounded-md overflow-hidden relative"
          >
            Play Again
            <div className="absolute inset-0 bg-emerald-600 opacity-10 rounded-md animate-pulse"></div>
          </button>
        </div>
      )}

      <div className="group fixed right-0 top-[200px] transform -translate-y-1/2 bg-[rgba(0,_0,_0,_0.7)] w-32 h-16 rounded-tl-[10px] rounded-bl-[10px] overflow-hidden transition-all duration-300 hover:w-48">
        <div className="flex items-center justify-center h-full">
          <p className="mb-0 text-white inline-block mr-2 text-base whitespace-nowrap pointer-events-none ms-2">
            Restart game
          </p>

          <RiRestartLine
            onClick={async () => {
              setCardOnTopOfDeck(null);
              setGueseedPairs(0);
              setCardsForPlaying([]);
              setNumberOfGuesses(0);
              setCardsForPlaying(await playAgain());
            }}
            style={{
              color: "white",
              fontSize: "50px",
              cursor: "pointer",
              strokeWidth: "1",
            }}
            className="hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300"
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const shuffleArray = (arr: string[]): string[] => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const getRandomAnimals = (arr: string[], n: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const randomInRange = (min: number, max: number): number =>
    Math.random() * (max - min) + min;

  try {
    // Fetch animal names from the API
    const res = await fetch("http://localhost:3001/api/images");
    const animalNames: string[] = await res.json();
    const updatedAnimalNames = animalNames.filter(
      (name) => name !== "flippedCard.png"
    );
    // Generate random animals

    const randomAnimalsForPlaying = getRandomAnimals(updatedAnimalNames, 24);
    const doubledAnimals = [
      ...randomAnimalsForPlaying,
      ...randomAnimalsForPlaying,
    ];
    const shuffledDoubledAnimals = shuffleArray(doubledAnimals);

    // Generate predefined landing positions
    const predefinedLandingPositions: Position[] = [];
    const rows = 6;
    const cols = 8;
    const xStart = 15;
    const xEnd = 85;
    const yStart = 16;
    const yEnd = 86;
    const offsetRange = 1.8;
    const angleRange = [-4, 4];
    const xStep = (xEnd - xStart) / cols;
    const yStep = (yEnd - yStart) / (rows - 1);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x =
          xStart + col * xStep + randomInRange(-offsetRange, offsetRange);
        const y =
          yStart + row * yStep + randomInRange(-offsetRange, offsetRange);
        const angle = randomInRange(angleRange[0], angleRange[1]);
        predefinedLandingPositions.push({ x, y, angle });
      }
    }

    // Prepare cards
    const cardsForPlayingProps = shuffledDoubledAnimals.map(
      (animal, index) => ({
        isFlipped: false,
        image: animal,
        id: index + 1,
        name: animal.replace(/\.png$/, ""),
        position: predefinedLandingPositions[index],
      })
    );

    // Initial dealing position

    return {
      props: {
        cardsForPlayingProps,
      },
    };
  } catch (error) {
    console.error("Error fetching animal names:", error);
    return {
      props: {
        cardsForPlayingProps: [],
        initialDealingPosition: { x: 0, y: 0, angle: 0 },
      },
    };
  }
};

export default InGame;
