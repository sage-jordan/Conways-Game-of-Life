import React, { Component } from 'react';
import Rules from './Rules';
import './App.css'

const totalBoardRows = 40;
const totalBoardColumns = 60;

const newBoardStatus = (cellStatus = () => Math.random() < 0.3) => { //injects true/false
  const grid = []; // initiate grid array
  for (let r = 0; r < totalBoardRows; r++) { //loop over rows
    grid[r] = []; // each row has a new array
    for (let c = 0; c < totalBoardColumns; c++) { //loop over columns
      grid[r][c] = cellStatus(); // each column has a new random boolean
    }
  }
  return grid; // returns an array of arrays with bool vals
};

const BoardGrid = ({ boardStatus, onToggleCellStatus }) => {
  // takes in board status and a method to toggle cell status
  const handleClick = (r, c) => onToggleCellStatus(r, c); // re-defining func

  const tr = []; // initiate grid
  for (let r = 0; r < totalBoardRows; r++) { //loop over rows
    const td = []; //initiate row
    for (let c = 0; c < totalBoardColumns; c++) { //loop over columns
      td.push( // each column, push a new cell to the row
        <td
          key={`${r},${c}`}
          className={boardStatus[r][c] ? 'alive' : 'dead'}
          onClick={() => handleClick(r, c)}
        />
      );
    }
    tr.push(<tr key={r}>{td}</tr>); //after each row, push it onto the grid
  }
  return <table><tbody>{tr}</tbody></table>;
};

const Slider = ({ speed, onSpeedChange }) => {
  // takes a speed and func to change it
  const handleChange = e => onSpeedChange(e.target.value); // handle change

  return ( // return a range input to control speed
    <input
      type='range'
      min='50'
      max='1000'
      step='50'
      value={speed}
      onChange={handleChange}
    />
  );
};

class App extends Component {
  state = { // INITIATE STATE
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
    speed: 500
  }

  runStopButton = () => { // BUTTONS
    return this.state.isGameRunning ? // checks if the game is running
      <button type='button' onClick={this.handleStop}>Stop</button> :
      <button type='button' onClick={this.handleRun}>Start</button>
    // and returns the correct button
  }

  handleClearBoard = () => { // CLEAR GRID
    this.setState({
      boardStatus: newBoardStatus(() => false), // run this func, passing in all false vals
      generation: 0 // reset generation
    })
  }

  handleNewBoard = () => { // RANDOMIZER
    this.setState({
      boardStatus: newBoardStatus(), // this time, we use the default random status
      generation: 0
    })
  }

  handleToggleCellStatus = (r, c) => { // TOGGLE ALIVE
    const toggleBoardStatus = prevState => {
      // func using prevState from setState
      const clonedBoardStatus = JSON.parse(JSON.stringify(prevState.boardStatus));
      // "deep clone" of board status 
      clonedBoardStatus[r][c] = !clonedBoardStatus[r][c]; //toggle status
      return clonedBoardStatus
    }

    this.setState(prevState => ({
      // setState gives PrevState if it takes a function
      boardStatus: toggleBoardStatus(prevState)
    }))
  }

  handleStep = () => { // GENERATE NEXT GRID
    const nextStep = prevState => {
      const boardStatus = prevState.boardStatus // previous status
      const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus))
      // clone board for double buffer

      const amountTrueNeighbors = (r, c) => { // function to count neighbors
        const neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        // array for all possible neighbor combinations
        return neighbors.reduce((trueNeighbors, neighbor) => {
          // reduce neighbors, adding each true neighbor to trueNeighbors
          const x = r + neighbor[0]; // row index of neighbor
          const y = c + neighbor[1]; // col index of neighbor
          const isNeighborOnBoard = ( // bool true if this index is on the board
            x >= 0 && // row index has not reached the left
            x < totalBoardRows &&  // row index is not reached the last
            y >= 0 && // col index has not reached the top
            y < totalBoardColumns) // col index has not reached the last

          if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
            // increment neighbors if it's on the board, it is true, 
            // and there are less than 4 neighbors.(no need to count more than 4)
            return trueNeighbors + 1; // return neighbor count incremented
          } else {
            // if any of that isn't true, we don't need to incrememnt
            return trueNeighbors; // return neighbor count
          }
        }, 0);
      };

      for (let r = 0; r < totalBoardRows; r++) { // loop over rows
        for (let c = 0; c < totalBoardColumns; c++) { // loop over cols
          const totalTrueNeighbors = amountTrueNeighbors(r, c);
          // each cell, call func to count neighbors, passing in each index

          if (!boardStatus[r][c]) { // if cell is dead
            // and neighbors = 3, set cell alive
            if (totalTrueNeighbors === 3) clonedBoardStatus[r][c] = true;
          } else { // if cell is alive
            // and neighbors are less than two or more than 3, cell dies
            if (totalTrueNeighbors < 2 || totalTrueNeighbors > 3) clonedBoardStatus[r][c] = false;
          }
        }
      }

      return clonedBoardStatus; // return cloned and modified grid
    }

    this.setState(prevState => ({
      boardStatus: nextStep(prevState), // set new status to run double buffer
      generation: prevState.generation + 1 // increment generation
    }))
  }

  handleSpeedChange = newSpeed => { // CHANGE SPEED
    this.setState({ speed: newSpeed })
  }

  handleRun = () => { // RUN GAME
    this.setState({ isGameRunning: true })
  }

  handleStop = () => { // STOP GAME
    this.setState({ isGameRunning: false })
  }

  componentDidUpdate(prevProps, prevState) { // HANDLING STATE CHANGES
    const { isGameRunning, speed } = this.state; // destructure state
    const speedChanged = prevState.speed !== speed; // true if speed changed
    const gameStarted = !prevState.isGameRunning && isGameRunning;
    // true if game was previously stopped, and is currently running
    const gameStopped = prevState.isGameRunning && !isGameRunning;
    // true if game was previously running, and is currently stopped

    if ((isGameRunning && speedChanged) || gameStopped) {
      // if running and speed was changed, or if the game stopped running
      clearInterval(this.timerID) // clear the game timer
    }

    if ((isGameRunning && speedChanged) || gameStarted) {
      // if running and speed was changed, or if the game has started running
      this.timerID = setInterval(() => { // set timer
        this.handleStep() // generate the next grid
      }, speed) // time of speed
    }
  }

  render() {
    const { boardStatus, isGameRunning, generation, speed } = this.state;
    // destructure state

    return (
      <div>
        <h1>Game of Life</h1>
        <Rules />
        <div className='flexRow upperControls'>
          <span>
            {'+ '}
            <Slider speed={speed} onSpeedChange={this.handleSpeedChange} />
            {' -'}
          </span>
          {`\nGeneration: ${generation}`}
        </div>
        <div className='flexRow lowerControls'>
          {this.runStopButton()}
          <button type='button' disabled={isGameRunning} onClick={this.handleStep}>Step</button>
          <button type='button' onClick={this.handleClearBoard}>Clear Board</button>
          <button type='button' onClick={this.handleNewBoard}>New Board</button>
        </div>
        <BoardGrid boardStatus={boardStatus} onToggleCellStatus={this.handleToggleCellStatus} />
      </div>
    )
  }
}
export default App;