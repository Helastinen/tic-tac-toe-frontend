const Square = ({ onSquareClick, index, value, winningLine}) => {
  const getSquareColor = () => {
    if (winningLine?.includes(index)) return `square winning-square`;

    switch (value) {
      case "X":
        return `square x-square`;
      case "O":
        return `square o-square`;
      default:
        return "square";
    }
  }

  return (
    <button className={getSquareColor()} onClick={onSquareClick}>
      {value}
    </button>
  )
}

export default Square;