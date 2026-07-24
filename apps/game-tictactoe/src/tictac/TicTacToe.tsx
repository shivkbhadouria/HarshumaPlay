import { useTicTacToe } from './useTicTacToe';
import './styles.css';

function TicTacToe() {
  // Destructure clean states, actions, and text managers from our custom logic hook
  const { board, play, resetGame, getStatusMessage } = useTicTacToe();

  return (
    <div className="game-container">
      <h3 className="game-title">Tic-Tac-Toe Game</h3>
      
      {/* Dynamic Status Header */}
      <div className="game-status">
        {getStatusMessage()}
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
