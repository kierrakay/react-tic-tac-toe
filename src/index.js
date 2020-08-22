import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  
      return (
          //passing an anonymous function on the onClick prop. it's binds this. React will only
          //call this function after a click
        <button 
            className="square" 
            onClick={props.onClick}>
                {props.value}
        </button>
      );
    }
  
class Board extends React.Component {
    constructor(props){
          super(props)

          this.state = {
              squares: Array(9).fill(null),
              xIsNext: true,
          }
      }

    handleClick(i) {
        const squares = this.state.squares.slice()
        squares[i] = this.state.xIsNext ? 'X' :'O'
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        })
    }
 

    renderSquare(i) {
      return (
      <Square 
      value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}
      />
      )
    //each square will now recieve a value of prop that will either be "X", "O", or null
    //onClick is a function we will pass to square to update the Board. We cant access BOARDS state in square
    //so we do this to allow SQUARE to call that function when a square is clicked
    //we are now passing down 2 props (value and onClick) to SQUARE.
    }
  
    render() {
      const winner = calculateWinner(this.state.squares)
      let status
      if (winner) {
          status = 'Winner' + winner
      } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
 
  //helper function
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
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }


  //notes:
//   we want the Square component to “remember” that it
//    got clicked, and fill it with an “X” mark. To “remember” things, components use state.