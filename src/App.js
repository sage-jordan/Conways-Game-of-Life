import React, { Component } from 'react';
import Rules from './components/Rules';
import './App.css'
import Square from './components/Square';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: [90, 20], // size of board. Will be mutated by user
      gameRunning: false
    }

    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
  }

  handleRowChange(event) {
    if (!this.state.gameRunning) {
      var actualSize = this.state.size;

      if (event.target.value < 20) {
        actualSize[1] = event.target.value;
      } else {
        actualSize[1] = 20;
      }

      this.setState({
        size: actualSize
      });

      this.renderBoard()

    }
  }

  handleColumnChange(event) {
    if (!this.state.gameRunning) {
      var actualSize = this.state.size;

      if (event.target.value < 90) {
        actualSize[0] = event.target.value;
      } else {
        actualSize[0] = 90;
      }

      this.setState({
        size: actualSize
      });

      this.renderBoard()

    }
  }

  startGame() {
    if (!this.state.gameRunning) {
      this.setState({
        gameRunning: true,
      }, () => {
        this.intervalRef = setInterval(() => this.runGame(), 10);
      })
    }
  }

  stopGame() {
    this.setState({
      gameRunning: false
    }, () => {
      if (this.intervalRef) {
        clearInterval(this.intervalRef)
      }
    })
  }

  runGame() {
  }

  renderBoard() {
    var newWorld = []
    var cellRow = []

    for (var i = 0; i < this.state.size[0]; i++) { // loop over columns
      for (var j = 0; j < this.state.size[1]; j++) { // loop over rows
        cellRow.push(<Square key={[i, j]} />) // for each instance, push a cell onto this row
      } // done making all rows
      newWorld.push(<div className="row" key={i}>{cellRow}</div>) // push each row to new board
      cellRow = [] // reset cellRow
    }
    return newWorld // return our finished board
  }

  render() {
    return (
      <div className="worldContainer" >
        <header>
          <h1>Conway's Game of Life</h1>
          <div className="headerInnerContainer">
            <label className="label">
              Rows:
            <input className="input" type="text" value={this.state.size[1]} onChange={this.handleRowChange} />
            </label>
            <label className="label">
              Columns:
            <input className="input" type="text" value={this.state.size[0]} onChange={this.handleColumnChange} />
            </label>
          </div>
        </header>
        <div className="headerButtons">
          <button className="submit" onClick={this.startGame}>Start</button>
          <button className="submit" onClick={this.stopGame}>Stop</button>
        </div>
        <Rules />
        Generation:
        <div className="boardContainer">
          {this.renderBoard()}
        </div>
      </div>
    )
  }

}

export default App;