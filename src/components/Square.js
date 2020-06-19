import React, { Component } from 'react';
// import App from '../App';
import styled from 'styled-components'

const Cell = styled.div`
    display: flex;
    flex: 1;
    padding: 10px;
    margin: 1px;
    border: 1px solid black;
`

class Square extends Component {
    constructor(props) {
        super(props)
        this.state = props.state
    }

    render() {
        return (
            <Cell props={this.state} />
        )
    }
}
export default Square