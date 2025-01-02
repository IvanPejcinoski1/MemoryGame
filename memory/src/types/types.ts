export interface FrontPageCard {
  image: string;
  id: number;
  name: string;
  position: Position;
}
export type Position = {
  x: number;
  y: number;
  angle: number;
};

export interface Card {
  isFlipped: boolean;
  image: string;
  id: number;
  name: string;
  position: Position;
  isAnimating?: boolean;
}

export interface inGameCardProps {
  card: Card;
}
export interface StartGameProps {
  cardsForFrontPageProps: Array<{
    image: string;
    id: number;
    name: string;
    position: Position;
  }>;
}
