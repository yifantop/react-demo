import React from "react";
import "./App.css";

class Cell extends React.Component {
  render() {
    if (!this.props.isCapture) {
      return (
        <div className="cell" onClick={() => {
          this.props.handleClick(this.props.rowIndex, this.props.colIndex);
        }}>
          {this.props.token}
        </div>
      );
    }
    return (
      <div className="cell">
        {this.props.token}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [
          {
            id: 1,
            isCapture: false,
            token: ""
          },
          {
            id: 2,
            isCapture: false,
            token: ""
          },
          {
            id: 3,
            isCapture: false,
            token: ""
          }
        ],
        [
          {
            id: 4,
            isCapture: false,
            token: ""
          },
          {
            id: 5,
            isCapture: false,
            token: ""
          },
          {
            id: 6,
            isCapture: false,
            token: ""
          }
        ],
        [
          {
            id: 7,
            isCapture: false,
            token: ""
          },
          {
            id: 8,
            isCapture: false,
            token: ""
          },
          {
            id: 9,
            isCapture: false,
            token: ""
          }
        ]
      ],
      chessType: "O"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  judgeFinish(rowIndex, colIndex) {
    let token = this.state.board[rowIndex][colIndex].token;
    let count = 0;
    for (let k = 0; k < this.state.board.length; k++) {
      if (token === this.state.board[rowIndex][k].token) {
        count++;
        if (count === 3) {
          this.props.changeFinishState(token);
          return;
        }
      } else {
        break;
      }
    }
    count = 0;
    for (let k = 0; k < this.state.board.length; k++) {
      if (token === this.state.board[k][colIndex].token) {
        count++;
        if (count === 3) {
          this.props.changeFinishState(token);
          return;
        }
      } else {
        break;
      }
    }
    if (this.state.board[0][0].token === this.state.board[1][1].token && this.state.board[1][1].token === this.state.board[2][2].token && this.state.board[2][2].token !== "") {
      this.props.changeFinishState(this.state.board[0][0].token);
      return;
    }
    if (this.state.board[0][2].token === this.state.board[1][1].token && this.state.board[1][1].token === this.state.board[2][0].token && this.state.board[2][0].token !== "") {
      this.props.changeFinishState(this.state.board[0][2].token);
    }
  }

  async handleClick(rowIndex, colIndex) {
    await new Promise((resolve, reject) => {
      this.setState((state) => {
        let newBoard = state.board;
        newBoard[rowIndex][colIndex].isCapture = true;
        newBoard[rowIndex][colIndex].token = this.state.chessType;
        return {
          board: newBoard,
          chessType: state.chessType === "O" ? "X" : "O"
        };
      });
      resolve();
    });
    this.judgeFinish(rowIndex, colIndex);
  }

  render() {
    return (
      <div className="board">
        {this.state.board.map((rowArr, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              {rowArr.map((item, colIndex) => {
                return (
                  <Cell key={item.id} isCapture={item.isCapture} token={item.token} rowIndex={rowIndex}
                        colIndex={colIndex}
                        handleClick={this.handleClick}/>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

class ResultDisplay extends React.Component {
  render() {
    if (this.props.isFinished) {
      return (
        <div>
          Winner: {this.props.winner}
        </div>
      );
    }
    return (
      <div>
        Winner:
      </div>
    );
  }
}

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFinished: false,
      winner: ""
    };
    this.changeFinishState = this.changeFinishState.bind(this);
  }

  changeFinishState(winner) {
    this.setState((state) => ({
      isFinished: true,
      winner: winner
    }));
  }

  render() {
    return (
      <div className="ticTacToe">
        <Board changeFinishState={this.changeFinishState}/>
        <ResultDisplay isFinished={this.state.isFinished} winner={this.state.winner}/>
        {this.state.isFinished ? <div className="mask"/> : ""}
      </div>
    );
  }
}

export default TicTacToe;