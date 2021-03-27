import { useState } from 'react'
import Board from './Board'

import './game.css'

const Game = () => {
  const [xIsNext, setXIsNext] = useState(true)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [history, setHistory] = useState([])
  const winner = calculateWinner(board)

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
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = i => {
    const boardCopy = [...board]
    if (winner || boardCopy[i]) return
    boardCopy[i] = xIsNext ? 'X' : 'O'
    setHistory(history => [...history, boardCopy])
    setBoard(boardCopy)
    setXIsNext(!xIsNext)
  }

  const handleRestart = () => {
    setBoard(Array(9).fill(null))
    setHistory([])
    setXIsNext(true)
  }

  const handleHistory = i => {
    i % 2 === 0 ? setXIsNext(false) : setXIsNext(true)
    setBoard(history[i])
    setHistory(history.slice(0, i + 1))
  }

  return (
    <div className='game'>
      <Board squares={board} handleClick={handleClick} />
      <div className='buttons'>
        {winner && (
          <div>
            <h3>Winner is {winner}</h3>
            <button
              className='btn btn-primary my-1 btn-block'
              onClick={handleRestart}
            >
              Restart
            </button>
          </div>
        )}
        <h2>History</h2>
        <div className='card history'>
          {history.map((h, i) => (
            <button
              key={i}
              className='btn btn-dark'
              onClick={() => handleHistory(i)}
            >
              Move {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Game
