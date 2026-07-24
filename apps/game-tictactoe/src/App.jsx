import { useState } from "react";

// Winning line combinations mapping the grid indexes
const winningBoxes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Optimized function using your structural matching algorithm
function getWinner(position, currentBoard, currentPlayer, currentGridFill) {
  // A player needs at least 3 moves to win (5 turns total across both players)
  if (currentGridFill < 5) return false;

  // Filter paths containing this position and short-circuit confirm via 'some' and 'every'
  return winningBoxes
    .filter((row) => row.includes(position))
    .some((row) => row.every((item) => currentBoard[item] === currentPlayer));
}

function App() {
  // Localized React states replacing mutable global references
  const [board, setBoard] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [gridFill, setGridFill] = useState(0);

  // Play function adapted for React's immutable state paradigm
  const play = (position) => {
    if (winner !== null) {
      console.log(`Game over! ${winner} has already won.`);
      return;
    }
    if (board[position] !== "") {
      console.log(
        `Invalid move! Position ${position} already taken by ${board[position]}`,
      );
      return;
    }

    // Clone board state to maintain React immutability
    const newBoard = [...board];
    newBoard[position] = player;

    const nextGridFill = gridFill + 1;

    setBoard(newBoard);
    setGridFill(nextGridFill);

    // Optimized win checking logic
    if (getWinner(position, newBoard, player, nextGridFill)) {
      setWinner(player);
      console.log(`Player ${player} is the winner`, newBoard);
      return;
    }

    // Shortest possible mathematical draw check
    if (nextGridFill === 9) {
      setWinner("Draw");
      console.log("Game Draw");
      return;
    }

    // Toggle active player state
    const nextPlayer = player === "X" ? "O" : "X";
    setPlayer(nextPlayer);
    console.log(`Next: ${nextPlayer}`);
  };

  // Reset all state configurations back to defaults
  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
    setWinner(null);
    setGridFill(0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <h3 style={{ margin: "10px 0", color: "#fff" }}>Tic-Tac-Toe Game</h3>

      {/* Dynamic Status Header */}
      <div
        style={{ marginBottom: "15px", fontSize: "18px", fontWeight: "bold" }}
      >
        {winner === "Draw"
          ? "Game Draw!"
          : winner
            ? `Winner: ${winner}`
            : `Next Player: ${player}`}
      </div>

      {/* 3x3 Grid Interface */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridTemplateRows: "repeat(3, 100px)",
          gap: "5px",
          backgroundColor: "#444",
          padding: "5px",
          borderRadius: "8px",
        }}
      >
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => play(index)}
            style={{
              backgroundColor: "#222",
              border: "1px solid #555",
              color: value === "X" ? "#4af" : value === "O" ? "#f55" : "#fff",
              fontSize: "28px",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "4px",
              transition: "background 0.2s",
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "14px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      >
        Reset Board
      </button>
    </div>
  );
}

export default App;
