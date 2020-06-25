import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)

        this.rows = props.rows
        this.col = props.col
        // this.setRow = props.setRow
        // this.handleColumnChange = props.handleColumnChange
        // this.handleRowChange = props.handleRowChange
        // this.state = {
        //     gameRunning: props.gameRunning,
        //     rows: props.rows,
        //     col: props.col
        // }
        this.setRow = this.setRow.bind(this)


    }

    setRow = (event) => {
        this.props.setRow(event)
    }
    // handleColumnChange = (event) => {
    //     this.props.handleColumnChange(event)
    // }

    // handleRowChange = (event) => {
    //     this.props.setRow(event)
    // }

    render() {
        return (
            <div className="headerInnerContainer">
                <label className="label">
                    Rows:
                <input className="input" type="text" value={this.rows} onChange={this.setRow} />
                </label>
                <label className="label">
                    Columns:
                <input className="input" type="text" value={this.col} onChange={this.handleColumnChange} />
                </label>
            </div>
        )
    }
}

export default Form;