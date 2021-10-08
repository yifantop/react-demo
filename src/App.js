import React from "react";
import "./App.css";

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => {
          this.props.onClick();
        }}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => {
        this.props.onClick(i);
      }}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: new Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0
    };
  }

  calculateWinner(squares) {
    const line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let arr of line) {
      if (squares[arr[0]] !== "" && squares[arr[0]] === squares[arr[1]] && squares[arr[1]] === squares[arr[2]]) {
        return squares[arr[0]];
      }
    }
    return null;
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState((state) => ({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !state.xIsNext,
      stepNumber: state.stepNumber + 1
    }));
  }

  jumpTo(step) {
    this.setState((state) => ({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      history: state.history.slice(0, step + 1)
    }));
  }

  render() {
    let history = this.state.history;
    let current = history[history.length - 1];
    let winner = this.calculateWinner(current.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button
            onClick={() => {
              this.jumpTo(move);
            }}>
            {desc}
          </button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={history[this.state.stepNumber].squares}
            onClick={(i) => {
              this.handleClick(i);
            }}/>
        </div>
        <div className="game-info">
          <div className="status">
            {status}
          </div>
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    );
  }
}

export default Game;

