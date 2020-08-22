import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  
      return (
          //passing an anonymous function on the onClick prop. it's binds this. React will only
          //call this function after a click
        <button 
            className="square" 
            onClick={() => props.onClick()}>
                {props.value}
        </button>
      );
    }
  
class Board extends React.Component {
    constructor(props){
          super(props)

          this.state = {
              squares: Array(9).fill(null)
          }
      }

    handleClick(i) {
        const squares = this.state.squares.slice()
        squares[i] = 'X'
        this.setState({
            squares: squares
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
      const status = 'Next player: X';
  
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
 
  

//   we want the Square component to “remember” that it
//    got clicked, and fill it with an “X” mark. To “remember” things, components use state.