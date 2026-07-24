// Define explicit strict types for the game states
export type Player = "X" | "O";
export type BoardValue = Player | "";
export type BoardState = BoardValue[];
export type GameWinner = Player | "Draw" | null;

// Winning line combinations mapping the grid indexes
const winningBoxes: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Highly optimized function using structural matching algorithm.
 * Returns true if the current move results in a win.
 */
export function getWinner(
  position: number,
  currentBoard: BoardState,
  currentPlayer: Player,
  currentGridFill: number,
): boolean {
  // A player needs at least 3 moves to win (5 turns total across both players)
  if (currentGridFill < 5) return false;

  // Filter paths containing this position and short-circuit confirm via 'some' and 'every'
  return winningBoxes
    .filter((row: number[]) => row.includes(position))
    .some((row: number[]) =>
      row.every((item: number) => currentBoard[item] === currentPlayer),
    );
}
