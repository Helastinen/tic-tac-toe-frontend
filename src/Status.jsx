const Status = ({ winningValue, nextIsX, grid, onReset }) => {
  const isTie = !winningValue && grid.every(item => item !== null);

  if (isTie) {
    return <p>Tie game. <button onClick={onReset}>Play again</button></p>
  }
  
  if (winningValue) {
      return <p>Winner is {winningValue}. <button onClick={onReset}>Play again</button></p>
  }

  return <p>Next turn is {nextIsX ? "X" : "O"}.</p>
}

export default Status;