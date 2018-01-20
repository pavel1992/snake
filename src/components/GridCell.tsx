import * as React from 'react'
import styled from 'styled-components'

export const Cell = styled.div`
    width: 20px;
    height: 20px;
    background-color: #dee5de;
    border: 1px solid grey;
`
export const Snake = Cell.extend`
    background-color: #4286f4;
`

export const Food = Cell.extend`
    background-color: #41f447;
`
