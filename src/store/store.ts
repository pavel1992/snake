import {combineReducers} from 'redux'
import settingsReducer from './reducers/settingsReducer'
import gameReducer from './reducers/gameReducer'
import {applyMiddleware, compose, createStore, Store} from 'redux'

const REDUX_DEV_TOOLS = '__REDUX_DEVTOOLS_EXTENSION__'

export type Settings = {
    rows: number
    columns: number
}

enum Direction {
    RIGHT,
    LEFT,
    TOP,
    BOTTOM,
}

export type Coords = {
    x: number
    y: number
}

export type GameState = {
    direction?: Direction
    snakePosition?: Array<Coords>
    foodPosition?: Coords
    score?: number
    firstRun: boolean
    gameInProgress: boolean
}

export type AppState = {
    settings: Settings,
    gameState: GameState
}

export const defaultState: AppState = {
    settings: {
        rows: 10,
        columns: 10,
    },
    gameState: {
        direction: Direction.RIGHT,
        snakePosition: [{x: 1, y: 1}],
        foodPosition: {x: 5, y: 5},
        score: 0,
        firstRun: true,
        gameInProgress: false,
    },
}

const reducers = combineReducers({settings: settingsReducer, gameState: gameReducer})

const getFrontEndMeddlewares = () =>
    window[REDUX_DEV_TOOLS] &&
        compose(
            window[REDUX_DEV_TOOLS]()
        )

const store = createStore(reducers, getFrontEndMeddlewares())

export default store
