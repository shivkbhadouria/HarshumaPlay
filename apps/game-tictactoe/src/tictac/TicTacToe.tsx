import { useState } from 'react';
import { getWinner, BoardState, Player, GameWinner } from './logic';
import './styles.css';

function TicTacToe() {
  // Localized React states typed strictly using TypeScript definitions
  const [board, setBoard] = useState<BoardState>(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<GameWinner>(null);
  const [gridFill, setGridFill] = useState<number>(0);

  // Play function adapted for React's immutable state paradigm
  const play = (position: number): void => {
    if (winner !== null) {
      console.log(`Game over! ${winner} has already won.`);
      return;
    }
    if (board[position] !== "") {
      console.log(`Invalid move! Position ${position} already taken by ${board[position]}`);
      return; 
    }

    // Clone board state to maintain React immutability safely
    const newBoard: BoardState = [...board];
    newBoard[position] = player;
    
    const nextGridFill = gridFill + 1;

    setBoard(newBoard);
    setGridFill(nextGridFill);

    // Call optimized external win checking logic
    if (getWinner(position, newBoard, player, nextGridFill)) {
      setWinner(player);
      console.log(`Player ${player} is the winner`, newBoard);
      return;
    }

    // Shortest possible mathematical draw check
    if (nextGridFill === 9) { 
      setWinner("Draw");
      console.log('Game Draw');
      return;
    }

    // Toggle active player state
    const nextPlayer: Player = player === "X" ? "O" : "X";
    setPlayer(nextPlayer);
    console.log(`Next: ${nextPlayer}`);
  };

  // Reset all state configurations back to defaults
  const resetGame = (): void => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer('X');
    setWinner(null);
    setGridFill(0);
  };

  return (
    <div className="game-container">
      <h3 className="game-title">Tic-Tac-Toe Game</h3>
      
      {/* Dynamic Status Header */}
      <div className="game-status">
        {winner === "Draw" ? "Game Draw!" : winner ? `Winner: ${winner}` : `Next Player: ${player}`}
      </div>
      
      {/* 3x3 Grid Interface */}
      <div className="grid-board">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => play(index)}
            className={`grid-cell ${value === 'X' ? 'player-x' : value === 'O' ? 'player-o' : ''}`}
          >
            {value}
          </button>
        ))}
      </div>

      <button onClick={resetGame} className="reset-btn">
        Reset Board
      </button>
    </div>
  );
}

export default TicTacToe;