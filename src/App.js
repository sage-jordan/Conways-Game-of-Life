import React, { Component } from 'react';
import Rules from './components/Rules';
import './App.css'
import Square from './components/Square';
import Form from './components/Form';

class App extends Component {
  constructor() {
    super();


    this.state = {
      rows: 90,
      col: 20,
      gameRunning: false,
      currentGrid: Array(90).fill().map(() => Array(20).fill(false)),
      generation: 0
    }
    // console.log(this.state.currentGrid)

    this.handleRowChange = this.handleRowChange.bind(this)
    this.handleColumnChange = this.handleColumnChange.bind(this)
    this.startGame = this.startGame.bind(this)
    this.stopGame = this.stopGame.bind(this)
    this.runGame = this.runGame.bind(this)
    this.renderBoard = this.renderBoard.bind(this)

  }

  handleRowChange(event) {
    if (!this.state.gameRunning) {
      console.log(this.state.currentGrid)


      let rows = this.state.rows

      if (event.target.value < 20) {
        rows = event.target.value;
      } else {
        rows = 20;
      }
      this.setState({ rows: rows })
      this.renderBoard()

    }
  }

  handleColumnChange(event) {
    if (!this.state.gameRunning) {
      console.log(this.state.currentGrid)

      let col = this.state.col

      if (event.target.value < 90) {
        col = event.target.value;
      } else {
        col = 90;
      }

      this.setState({ col: col })
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
    var rows = this.rows
    var col = this.col
    var newWorld = [] // define new grid
    var grid = this.state.currentGrid
    for (var i = 0; i < this.col; i++) { // loop over columns
      for (var j = 0; j < this.rows; j++) { // loop over rows

        let liveNeighbors = 0 // initiate liveNeighbors count

        // Right Neighbor
        if (i < rows - 1) { // check if row has reached the end
          if (this.state.currentGrid[j][i + 1].alive) { // check neighbor
            liveNeighbors++ // increment this cell's neighbors
          }
        }

        // Bottom-right neighbor
        if (j < col - 1 && i < rows - 1) {
          if (grid[j + 1][i + 1].alive) {
            liveNeighbors++
          }
        }

        // Bottom neighbor
        if (j < col - 1) {
          if (grid[j + 1][i].alive) {
            liveNeighbors++
          }
        }

        // Bottom-left neighbor
        if (j < col - 1 && i > 0) {
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
        if (j > 0 && i < rows - 1) {
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
    console.log(this.state.currentGrid)
    for (var i = 0; i < this.state.col; i++) { // loop over columns
      for (var j = 0; j < this.state.rows; j++) { // loop over rows
        // console.log("i: ", i, "j: " + j)
        if (this.state.currentGrid[i][j]) {
          cellRow.push(<Square key={[i, j]} id={[i, j]} alive={true} />)
        } else {
          cellRow.push(<Square key={[i, j]} id={[i, j]} alive={false} />)
        }
      } // done making all rows
      finishedBoard.push(<div className="row" key={i} >{cellRow}</div>) // push each row to new board
      cellRow = [] // reset cellRow
    }
    // console.log(finishedBoard)
    return finishedBoard // return our finished board
  }

  render() {
    return (
      <div className="worldContainer" >
        <header>
          <h1>Conway's Game of Life</h1>
          <Form setRow={(i) => this.setState({ row: i })} handleColumnChange={this.handleColumnChange} handleRowChange={this.handleRowChange} rows={this.state.rows} col={this.state.col} />
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