import React, { Component } from 'react';
import Rules from './components/Rules';
import './App.css'
import Square from './components/Square';

class App extends Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      gameRunning: false,
      currentGrid: Array(this.state.size[1]).fill().map(() => Array(this.state.size[0]).fill(false)),
      generation: 0
    }

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
      console.log("Starting game...")
      this.setState({
        gameRunning: true,
      }, () => {
        this.intervalRef = setInterval(() => this.runGame(), 10);
      })
    }
  }

  stopGame() {
    console.log("Stopping game...")
    this.setState({
      gameRunning: false
    }, () => {
      if (this.intervalRef) {
        clearInterval(this.intervalRef)
      }
    })
  }

  runGame() {
    var size = this.state.size // define size
    var newWorld = [] // define new grid
    var grid = this.state.currentGrid
    for (var i = 0; i < this.state.size[0]; i++) { // loop over columns
      for (var j = 0; j < this.state.size[1]; j++) { // loop over rows

        // NOT SURE HOW TO ACCESS CELLS' STATE WHEN THEY ARE DOM ELEMENTS
        // console.log(grid[j].props.children[i])
        var thisCell = document.getElementById([i, j])
        console.log(thisCell)


        let liveNeighbors = 0 // initiate liveNeighbors count

        // Right Neighbor
        if (i < size[0] - 1) { // check if row has reached the end
          if (grid[j][i + 1].alive) { // check neighbor
            liveNeighbors++ // increment this cell's neighbors
          }
        }

        // Bottom-right neighbor
        if (j < size[1] - 1 && i < size[0] - 1) {
          if (grid[j + 1][i + 1].alive) {
            liveNeighbors++
          }
        }

        // Bottom neighbor
        if (j < size[1] - 1) {
          if (grid[j + 1][i].alive) {
            liveNeighbors++
          }
        }

        // Bottom-left neighbor
        if (j < size[1] - 1 && i > 0) {
          if (grid[j + 1][i - 1].alive) {
            liveNeighbors++
          }
        }

        // Left neighbor
        if (i > 0) {
          if (grid[j][i - 1].alive) {
            liveNeighbors++
          }
        }

        // Top-left neighbor
        if (i > 0 && j > 0) {
          if (grid[j - 1][i - 1].alive) {
            liveNeighbors++
          }
        }

        // Top neighbor
        if (j > 0) {
          if (grid[j - 1][i].alive) {
            liveNeighbors++
          }
        }

        // Top-right neighbor
        if (j > 0 && i < size[0] - 1) {
          if (grid[j - 1][i + 1].alive) {
            liveNeighbors++
          }
        }

        // Apply life/death rules based on neighbor count

        if (!grid[j][i].alive && liveNeighbors === 3) { // if cell is dead and has 3 neighbors
          newWorld[j][i].alive = true; // GETS RESURECTED :o
        }

        if (grid[j][i].alive && (liveNeighbors > 3 || liveNeighbors < 2)) { // if alive AND neighbors == 1 or > 3
          newWorld[j][i].alive = false; // dies
        }

      } // done checking all rows

    } // done checking all columns

    this.setState({
      generation: this.state.generation + 1,
      currentGrid: newWorld
    })
  }

  renderBoard() {
    var finishedBoard = []
    var cellRow = []

    for (var i = 0; i < this.state.size[0]; i++) { // loop over columns
      for (var j = 0; j < this.state.size[1]; j++) { // loop over rows
        if (this.state.currentGrid[i, j]) { // THIS NEEDS REFACTORED FOR NEW GRID
          var square = Square([i, j]);
          finishedBoard.push(square) // for each alive instance, push a cell onto this row
          square.toggleAlive()
        } else {
          finishedBoard.push(<Square key={[i, j]} />)
        }
      } // done making all rows
      finishedBoard.push(<div className="row" key={i} >{cellRow}</div>) // push each row to new board
      cellRow = [] // reset cellRow
    }
    console.log(finishedBoard)
    return finishedBoard // return our finished board
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
        Generation: {this.generation}
        <div className="boardContainer">
          {this.renderBoard()}
        </div>
      </div>
    )
  }

}

export default App;