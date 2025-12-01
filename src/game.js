import React, { useState } from "react";

// =====================
// SQUARE
// =====================
function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

// =====================
// BOARD
// =====================
function Board({ squares, onPlay, xIsNext }) {
  const nextValue = xIsNext ? "X" : "O";
  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = nextValue;
    onPlay(nextSquares);
  }

  const status = winner
    ? `Vencedor: ${winner}`
    : `Próximo jogador: ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        {[0, 1, 2].map(i => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>

      <div className="board-row">
        {[3, 4, 5].map(i => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>

      <div className="board-row">
        {[6, 7, 8].map(i => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>
    </>
  );
}

// =====================
// GAME (SEM HISTÓRICO)
// =====================
export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handlePlay(nextSquares) {
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onPlay={handlePlay} xIsNext={xIsNext} />
        <button className="reset-btn" onClick={resetGame}>Reiniciar</button>
      </div>
    </div>
  );
}

// =====================
// WINNER LOGIC
// =====================
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
