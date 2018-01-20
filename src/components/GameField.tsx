import * as React from 'react'
import styled from 'styled-components'
import {AppState, default as store, GameState, Settings} from '../store/store'
import {Cell, Food, Snake} from './GridCell'
import {contains, equals, times} from 'ramda'
import Button from 'material-ui/Button'
import {createGameAction} from '../store/actionCreators/gameActionCreator'
import {GAME_STARTED} from '../store/constants'
import {connect} from 'react-redux'
import {lifecycle} from 'recompose'

const Row = styled.div`
    display: flex;
`

const Label = styled.div`
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 14;
    margin-bottom: 40px;
`

const startGame = () => store.dispatch(createGameAction(GAME_STARTED))

const renderCell = (y: number, {snakePosition, foodPosition}: Partial<GameState>) => (x: number) =>
    contains({x, y})(snakePosition)
        ? <Snake key={`c${x}${y}`}/>
        : equals(foodPosition)({x, y})
            ? <Food key={`c${x}${y}`}/>
            : <Cell key={`c${x}${y}`}/>


const getTitle = (props: Partial<GameState>) =>
    <Label>{props.firstRun ? 'Нажмите начать игру для старта' : `Игра окончена. Ваш счет: ${props.score}`}</Label>

const getMenuScreen = ({score, firstRun}: Partial<GameState>) =>
    <>
        {getTitle({score, firstRun})}
        <Button raised color='primary' onClick={startGame}>Начать игру</Button>
    </>

const renderRows = (settings: Settings, {snakePosition, foodPosition}: Partial<GameState> ) =>
    times(n =>
        <Row key={`r${n}`}>
            {times(k => renderCell(n, {snakePosition, foodPosition})(k))(settings.columns)}
        </Row>)(settings.rows)


const getGrid = (props: AppState) =>
    props.gameState.gameInProgress
        ? renderRows(props.settings, props.gameState)
        : getMenuScreen(props.gameState)

const mapStateToProps = (state: AppState) => state

export default connect(mapStateToProps)(getGrid)
