import { useState } from "react";
import './App.css';
import {
  Button,
  Text,
  Box
}
  from '@chakra-ui/react'

function Square({ value, onSquareClick }) {
  return (
    <Button
      className="square"
      onClick={onSquareClick}
      boxShadow='lg'
      height='70px'
      width='70px'
      margin='1px'
      fontWeight='bold'
      borderRadius='md'
      bgGradient='linear(to-r, blue.500, cyan.400)'
      _hover={{
        bgGradient: 'linear(to-r, teal.500, green.300)'
      }}
    >
      {value}
    </Button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function squareClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice()

    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }

    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)

  let status;
  if (winner) {
    status = `Winner : ${winner}`
  } else {
    status = 'Next player : ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <>
      <Text color='cyan.300' fontSize='2xl' margin='30px'>
        TIC TAC TOE
      </Text>
      <Text fontSize='xl' color='cyan.300' mb='20px'>
        {status}
      </Text>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => squareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => squareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => squareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => squareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => squareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => squareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => squareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => squareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => squareClick(8)} />
      </div>
    </>
  )
}

function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <Text key={move} margin='10px' fontSize='xl'>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </Text>
    );
  });

  return (
    <>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <Box color='cyan.300' fontSize='md' className='game-info' align='center'>
        {moves}
      </Box>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <>
      <Box align='center'>
        <Game />
      </Box>
    </>
  );
}

export default App;
