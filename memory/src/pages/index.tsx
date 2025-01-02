import { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import CardComponentFrontPage from "src/components/CardComponentFrontPage";
import { mainContext } from "src/context/mainContext";
import { Position, StartGameProps } from "src/types/types";

const StartGame: React.FC<StartGameProps> = ({ cardsForFrontPageProps }) => {
  const { clearTable, setClearTable, setSlideUp, slideUp } =
    useContext(mainContext);
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState("");
  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
  };

  return (
    <div id="startGame">
      <h1 className={`memoryHeadline ${slideUp ? "slideUp" : ""}`}>
        <span className="letter letter-1">M</span>
        <span className="letter letter-2">E</span>
        <span className="letter letter-3">M</span>
        <span className="letter letter-4">O</span>
        <span className="letter letter-5">R</span>
        <span className="letter letter-6">Y</span>
      </h1>
      {clearTable ? (
        <div className="modal text-white p-6 text-center">
          <h2 className="text-6xl mb-6">Select Mode</h2>
          <div className="flex justify-center items-center space-x-24 mt-12">
            {" "}
            <button
              onClick={() => handleModeChange("Single Player")}
              className={`px-6 py-2 text-xl rounded-md ${
                selectedMode === "Single Player"
                  ? "bg-gray-200 text-black px-8 py-3 text-2xl" // Larger size when selected
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              Single Player
            </button>
            <button
              onClick={() => handleModeChange("Play with Friend")}
              className={`px-6 py-2 text-xl rounded-md ${
                selectedMode === "Play with Friend"
                  ? "bg-gray-200 text-black px-8 py-3 text-2xl" // Larger size when selected
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              Play with Friend
            </button>
          </div>
          {selectedMode && selectedMode == "Play with Friend" && (
            <div className="mt-5 text-2xl ">
              We’re building something awesome! Check back soon!
            </div>
          )}
          <div>
            {selectedMode && selectedMode == "Single Player" && (
              <button
                onClick={() => {
                  router.push("/inGame");
                }}
                className="bg-gradient-to-r from-emerald-900 to-emerald-700 white text-4xl px-10 py-4 inline-block mt-14 rounded-md overflow-hidden relative"
              >
                Start game
                <div className="absolute inset-0 bg-emerald-600 opacity-10 rounded-md animate-pulse"></div>{" "}
                {/* Faint background pulse */}
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setSlideUp(true);
            setClearTable(true);
          }}
          className="gameParagraph px-6 py-1 mt-2 border-2 border-black bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          PLAY GAME
        </button>
      )}

      {cardsForFrontPageProps.map((card) => (
        <CardComponentFrontPage key={card.id} card={card} />
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  const predefinedLandingPositions: Position[] = [
    { x: 22, y: 16, angle: -20 },
    { x: 77, y: 14, angle: 19 },
    { x: 29, y: 60, angle: 8 },
    { x: 75, y: 75, angle: -10 },
    { x: 50, y: 5, angle: 11 },
    { x: 48, y: 75, angle: -4 },
    { x: 20, y: 50, angle: 13 },
    { x: 79, y: 40, angle: 8 },
    { x: 30, y: 8, angle: 4 },
    { x: 67, y: 9, angle: -9 },
    { x: 23, y: 73, angle: -14 },
    { x: 67, y: 67, angle: 10 },
  ];

  try {
    const res = await fetch("http://localhost:3001/api/images");

    if (!res.ok) {
      throw new Error(`Failed to fetch animal images. Status: ${res.status}`);
    }

    const animalNames: string[] = await res.json();

    const getRandomAnimals = (animals: string[], count: number) =>
      animals.sort(() => 0.5 - Math.random()).slice(0, count);

    const showRandomAnimals = getRandomAnimals(animalNames, 9);
    const showIntroCards = [...showRandomAnimals];

    [2, 4, 7].forEach((pos) => {
      showIntroCards.splice(pos, 0, "flippedCard.png");
    });

    const cardsForFrontPageProps = showIntroCards.map((animal, index) => ({
      image: animal,
      id: index + 1,
      name: animal.replace(/\.png$/, ""),
      position: predefinedLandingPositions[index],
    }));

    return { props: { cardsForFrontPageProps } };
  } catch (error) {
    console.error("Error fetching animal images:", error);

    return {
      props: {
        cardsForFrontPageProps: [],
      },
    };
  }
};

export default StartGame;
