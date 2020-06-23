import React, { Component } from 'react';
import styled from 'styled-components';
import '../App.css'

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


    toggleAlive(event) {

        console.log(this.state.id)
        var thisCell = document.getElementById(this.state.id)
        this.setState({ ...this.state, alive: !this.state.alive });

        if (this.state.alive) {
            thisCell.classList.remove('alive');
        } else {
            thisCell.classList.add('alive');
        }
    }

    render() {
        return (
            <Cell onClick={this.toggleAlive} id={this.state.id} />
        )
    }
}
export default Square