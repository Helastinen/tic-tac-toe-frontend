import Grid from "./Grid";

const MoveHistory = ({ history }) => {
  return (
    <ul>
      {history.map((move, i) => { 
        if (i > 0 && i < history.length - 1) {
          return (
            <li key={i} className="small-grid">
              <div>Turn #{i}</div>
              <Grid grid={history[i]} disabled />
            </li>
          )
        }
      })}
    </ul>
  )
}

export default MoveHistory;