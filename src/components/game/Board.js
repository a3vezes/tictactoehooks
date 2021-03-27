import Square from './Square'

const Board = ({ squares, handleClick }) => {
  return (
    <div className='board'>
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => handleClick(i)} />
      ))}
    </div>
  )
}

export default Board
