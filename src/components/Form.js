import React, { Component } from 'react';
import App from '../App';

class Form extends Component {
    constructor(props) {
        super(props)

        this.renderBoard = props.renderBoard.bind(this)
        this.handleRowChange = this.hCC.bind(this)
        this.handleColumnChange = this.hRC.bind(this)
        this.getRows = this.getRows.bind(this)
        this.getCols = this.getCols.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.getRows() != prevProps.state.rows || this.getCols() !== prevProps.state.col) {
            console.log("re-rendering....")
            this.renderBoard()
        }
    }
    hCC = (event) => this.props.handleColumnChange(event)

    hRC = (event) => this.props.handleRowChange(event)

    getRows = () => this.props.state.rows

    getCols = () => this.props.state.col

    render() {
        return (
            <div className="headerInnerContainer">
                <label className="label">
                    Rows:
                <input className="input" type="text" value={this.getRows()} onChange={this.hRC} />
                </label>
                <label className="label">
                    Columns:
                <input className="input" type="text" value={this.getCols()} onChange={this.hCC} />
                </label>
            </div>
        )
    }
}

export default Form;