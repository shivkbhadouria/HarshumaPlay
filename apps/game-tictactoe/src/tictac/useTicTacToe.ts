import { useState } from 'react';

// --- 1. TYPE DEFINITIONS ---
export type Player = "X" | "O";
export type BoardValue = Player | "";
export type BoardState = BoardValue[];
export type GameWinner = Player | "Draw" | null;

// --- 2. GAME CONSTANTS ---
const INITIAL_BOARD: BoardState = ["", "", "", "", "", "", "", "", ""];

const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];;

// --- 3. OPTIMIZED BUSINESS LOGIC ---
function checkWin(position: number, currentBoard: BoardState, currentPlayer: Player): boolean {
  // Count filled cells to determine total turns taken
  const gridFill = currentBoard.filter(cell => cell !== "").length;
  
  // Short-circuit gate: A player needs at least 3 moves to win (5 turns total)
  if (gridFill < 5) return false;

  // Filter paths containing this position and verify via 'some' and 'every'
  return WINNING_COMBINATIONS
    .filter((row: number[]) => row.includes(position))
    .some((row: number[]) =>
      row.every((item: number) => currentBoard[item] === currentPlayer)
    );
}

// --- 4. THE CUSTOM REACT HOOK ---
export function useTicTacToe() {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [player, setPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<GameWinner>(null);

  const isValidMove = (position: number): boolean => {
    return winner === null && board[position] === "";
  };

  const getNextPlayer = (currentPlayer: Player): Player => {
    return currentPlayer === "X" ? "O" : "X";
  };

  const isDraw = (newBoard: BoardState): boolean => {
    return newBoard.every(cell => cell !== "");
  };

  const play = (position: number): void => {
    if (!isValidMove(position)) return;

    // Maintain immutability via cloning
    const newBoard: BoardState = [...board];
    newBoard[position] = player;
    setBoard(newBoard);

    // Run externalized structural check within the hook file
    if (checkWin(position, newBoard, player)) {
      setWinner(player);
      return;
    }

    if (isDraw(newBoard)) {
      setWinner("Draw");
      return;
    }

    setPlayer(getNextPlayer(player));
  };

  const resetGame = (): void => {
    setBoard(INITIAL_BOARD);
    setPlayer('X');
    setWinner(null);
  };

  const getStatusMessage = (): string => {
    if (winner === "Draw") return "Game Draw!";
    if (winner) return `Winner: ${winner}`;
    return `Next Player: ${player}`;
  };

  return {
    board,
    play,
    resetGame,
    getStatusMessage,
  };
}
