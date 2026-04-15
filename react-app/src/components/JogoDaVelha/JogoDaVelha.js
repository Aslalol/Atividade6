import React, { useState } from 'react';
import styles from './JogoDaVelha.module.css';

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function calcWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

function JogoDaVelha() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const result = calcWinner(board);
  const isDraw = !result && board.every(Boolean);

  const handleClick = (i) => {
    if (board[i] || result) return;
    const next = [...board];
    next[i] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext(!xIsNext);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const getStatus = () => {
    if (result) return `Vencedor: ${result.winner}`;
    if (isDraw) return 'Empate!';
    return `Vez de: ${xIsNext ? 'X' : 'O'}`;
  };

  return (
    <div>
      <div className={styles.container}>
        <p className={styles.status}>{getStatus()}</p>

        <div className={styles.board}>
          {board.map((val, i) => (
            <button
              key={i}
              className={[
                styles.cell,
                val === 'X' ? styles.x : '',
                val === 'O' ? styles.o : '',
              ].join(' ')}
              onClick={() => handleClick(i)}
            >
              {val}
            </button>
          ))}
        </div>

        <button className={styles.btnReset} onClick={reset}>
          novo jogo
        </button>
      </div>
    </div>
  );
}

export default JogoDaVelha;