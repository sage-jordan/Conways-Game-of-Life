import React, { Component } from 'react';
import styled from 'styled-components';
import './Square.css';

const Cell = styled.div`
    padding: 10px;
    margin: 1px;
    border: 1px solid black;
`

class Square extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alive: false,
            id: props.id
        }

        this.toggleAlive = this.toggleAlive.bind(this);

    }

    toggleAlive() {
        console.log(this.state.id)
        var thisCell = document.getElementById(this.state.id)
        if (this.state.alive) {
            this.setState({ ...this.state, alive: !this.state.alive });
            thisCell.classList.remove('alive');
            console.log(thisCell);
        } else {
            this.setState({ ...this.state, alive: !this.state.alive });
            thisCell.classList.add('alive');
            console.log(thisCell);
        }
    }

    render() {
        return (
            <Cell onClick={this.toggleAlive} id={this.state.id} />
        )
    }
}
export default Square