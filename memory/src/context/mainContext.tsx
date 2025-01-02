import React, { createContext, useState, ReactNode } from "react";
import { Card } from "src/types/types";

interface Props {
  children: ReactNode;
}

interface Position {
  x: number;
  y: number;
  angle: number;
}

interface ContextData {
  clearTable: boolean;
  setClearTable: (value: boolean) => void;
  animalNames: string[];
  getRandomAnimals: (arr: string[], n: number) => string[];
  firstCardOpenned: Card | null;
  setFirstCardOpenned: (card: Card | null) => void;
  slideUp: boolean;
  setSlideUp: (value: boolean) => void;
  playAgain: () => Promise<Card[]>;
  numberOfGuesses: number;
  setNumberOfGuesses: (num: any) => void;
}

export const mainContext = createContext({} as ContextData);

export const MainProvider: React.FC<Props> = ({ children }) => {
  const [slideUp, setSlideUp] = useState(false);
  const [clearTable, setClearTable] = useState(false);
  const [animalNames, setAnimalNames] = useState<string[]>([]);
  const [firstCardOpenned, setFirstCardOpenned] = useState<Card | null>(null);
  const [numberOfGuesses, setNumberOfGuesses] = useState<any>(0);

  const getRandomAnimals = (arr: string[], n: number): string[] => {
    const filteredArr = arr.filter((animal) => animal !== "flippedCard");
    const shuffled = [...filteredArr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  };
  const shuffleArray = (arr: string[]): string[] => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const randomInRange = (min: number, max: number): number =>
    Math.random() * (max - min) + min;

  const playAgain = async (): Promise<Card[]> => {
    try {
      const res = await fetch("http://localhost:3001/api/images");
      const animalNames: string[] = await res.json();
      const updatedAnimalNames = animalNames.filter(
        (name) => name !== "flippedCard.png"
      );

      const randomAnimalsForPlaying = getRandomAnimals(updatedAnimalNames, 24);
      const doubledAnimals = [
        ...randomAnimalsForPlaying,
        ...randomAnimalsForPlaying,
      ];
      const shuffledDoubledAnimals = shuffleArray(doubledAnimals);

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

      return shuffledDoubledAnimals.map((animal, index) => ({
        isFlipped: false,
        image: animal,
        id: index + 1,
        name: animal.replace(/\.png$/, ""),
        position: predefinedLandingPositions[index],
      }));
    } catch (error) {
      console.error("Error generating new game cards:", error);
      throw new Error("Failed to start a new game.");
    }
  };

  return (
    <mainContext.Provider
      value={{
        clearTable,
        setClearTable,
        animalNames,
        getRandomAnimals,
        firstCardOpenned,
        setFirstCardOpenned,
        slideUp,
        setSlideUp,
        playAgain,
        numberOfGuesses,
        setNumberOfGuesses,
      }}
    >
      {children}
    </mainContext.Provider>
  );
};
