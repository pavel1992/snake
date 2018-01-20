import * as React from 'react'
import styled from 'styled-components'

type GridCellProps = {
    isFood: boolean
    isSnake: boolean
}

export default ({isFood, isSnake}: GridCellProps) =>
    styled.div`
    width: 2%;
    height: 2%;
    background-color: ${isSnake ? '#4286f4' : isFood ? '#41f447' : '#dee5de'};
    `
