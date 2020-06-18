import React from 'react';
import App from '../App';
import styled from 'styled-components'

const Square = styled.div`

`

export default class Square extends App {
    constructor(props) {
        super(props)
        this.state = props.state
    }

    render() {
        return (
            <Square props={this.state} />
        )
    }
}