import React, { Component } from 'react';
import Rules from './components/Rules';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: [90, 20],
      alive: false, // current state: (alive, dead), (black, white)
      clickable: false, // can be clicked to allow user to setup initial cell configuration
      // should NOT be clickable while simulation is running
    }
  }


  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <h1>Conway's Game of Life</h1>
          <label className="label">
            Rows:
          <input className="input" type="text" value={this.state.size[1]} onChange={this.handleRowChange} />
          </label>
          <label className="label">
            Columns:
          <input className="input" type="text" value={this.state.size[0]} onChange={this.handleColumnChange} />
          </label>
          <div className="headerButtons">
            <button className="submit" onClick={this.startGame}>Start</button>
            <button className="submit" onClick={this.stopGame}>Stop</button>
          </div>
        </header>
        <Rules />
      </div>
    )
  }

}

export default App;