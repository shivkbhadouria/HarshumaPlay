import { useState, lazy, Suspense } from 'react';

// Lazy load the remote Tic-Tac-Toe game
const TicTacToeGame = lazy(() => import('game_tictactoe/App'));

function App() {
  const [activeGame, setActiveGame] = useState(null);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Harshuma Play</h1>
      <p>Select a game to start playing instantly!</p>

      {/* Navigation Buttons */}
      <div style={{ marginBottom: '30px' }}>
        <button 
          onClick={() => setActiveGame('tictactoe')}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}
        >
          Play Tic-Tac-Toe
        </button>
        {activeGame && (
          <button 
            onClick={() => setActiveGame(null)}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none' }}
          >
            Close Game
          </button>
        )}
      </div>

      {/* Game Display Area */}
      <div style={{ border: '2px dashed #ccc', padding: '20px', minHeight: '30px', borderRadius: '8px' }}>
        <Suspense fallback={<div>Loading Game...</div>}>
          {activeGame === 'tictactoe' && <TicTacToeGame />}
          {!activeGame && <p>No game selected. Click a button above!</p>}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
