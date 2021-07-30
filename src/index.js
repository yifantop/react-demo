import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const Cell = function (props) {
  return (
    <div className="cell" onClick={props.onClick}>
      { props.text }
    </div>
  );
}

const ChessBoard = function () {
  const [cells, setCells] = React.useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [n, setN] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const judge = (cells) => {
    for (let i = 0; i < 3; i++) {
      if (cells[i][0] === cells[i][1] && cells[i][1] === cells[i][2] && cells[i][2] !== null) {
        return true;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (cells[0][i] === cells[1][i] && cells[1][i] === cells[2][i] && cells[2][i] !== null) {
        return true;
      }
    }
    if (cells[0][0] === cells[1][1] && cells[1][1] === cells[2][2] && cells[2][2] !== null) {
      return true; 
    }
    if (cells[2][0] === cells[1][1] && cells[1][1] === cells[0][2] && cells[0][2] !== null) {
      return true;
    }
    return false;
  }
  const onClickCell = (row, col) => {
    setN(n + 1);
    const copy = JSON.parse(JSON.stringify(cells));
    copy[row][col] = n % 2 === 0 ? 'x' : 'o';
    setCells(copy);
    if (judge(copy)) {
      setFinished(true);
    };
  };
  return (
    <div>
      { cells.map((items, row) => <div className="row">
        { items.map((item, col) => <div className="col">
          <Cell text={ item } onClick={() => onClickCell(row, col)} /></div>) }</div>) }
    {finished && <div className="gameOver">游戏结束</div>}
    </div>
  )
}

ReactDOM.render(
  <div>
    <ChessBoard></ChessBoard>
  </div>, document.getElementById('root'));