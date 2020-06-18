import React, { Component } from 'react';
import Rules from './components/Rules';
import './App.css'
import Square from './components/Square';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: [90, 20], // size of board. Will be mutated by user
      alive: false, // current state: (alive, dead), (black, white)
      clickable: false, // can be clicked to allow user to setup initial cell configuration
      // should NOT be clickable while simulation is running
    }

    // this.handleColumnChange = this.handleColumnChange.bind(this);
    // this.handleRowChange = this.handleRowChange.bind(this);
    // this.startGame = this.startGame.bind(this);
    // this.stopGame = this.stopGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
  }

  // handleRowChange(event) {
  // }

  // handleColumnChange(event) {
  // }

  // startGame() {
  // }

  // stopGame() {
  // }

  // runGame() {
  // }

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