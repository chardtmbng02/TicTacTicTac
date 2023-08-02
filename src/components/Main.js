import React, { useState } from "react";
import "./Main.css"; // CSS styling import

// Define the Main component
const Main = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Initialize the game board state with an array of 9 null values
  const [isXNext, setIsXNext] = useState(true); // Initialize the player's turn state (true for 'X', false for 'O')

  // This function will handle the square click.
  const handleClick = (index) => {
    // Check if the square is already occupied or if there is a winner.
    if (board[index] || calculateWinner(board)) {
      return;
    }
    // Create a new copy of the board array and update the clicked square.
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Function to render a single square button.
  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  // This will calculate the winner.
  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div className="tic-tac-toe">
      <div className="status">{status}</div>
      <div className="board">
        {Array(9)
          .fill()
          .map((_, index) => renderSquare(index))}
      </div>
      <button className="restart" onClick={() => setBoard(Array(9).fill(null))}>
        Restart
      </button>
    </div>
  );
};

// Helper function to calculate the winner
const calculateWinner = (board) => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winning player ('X' or 'O')
    }
  }

  // Return null if there's no winner
  return null; 
};

export default Main;
