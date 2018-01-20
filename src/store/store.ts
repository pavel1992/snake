import {combineReducers} from 'redux'
import settingsReducer from './reducers/settingsReducer'
import gameReducer from './reducers/gameReducer'
import {applyMiddleware, compose, createStore, Store} from 'redux'
import {runGameMiddleware} from './middlewares/runGameMiddleware'

const REDUX_DEV_TOOLS = '__REDUX_DEVTOOLS_EXTENSION__'

export type Settings = {
    rows: number
    columns: number
}

export enum Direction {
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
        snakePosition: [{x: 0, y: 0}],
        foodPosition: {x: 5, y: 0},
        score: 0,
        firstRun: true,
        gameInProgress: false,
    },
}

const reducers = combineReducers({settings: settingsReducer, gameState: gameReducer})

const getFrontEndMiddlewares = () =>
    window[REDUX_DEV_TOOLS] ?
        compose(
            applyMiddleware(runGameMiddleware),
            window[REDUX_DEV_TOOLS]()
        ) :
        compose(
            applyMiddleware(runGameMiddleware)
        )

const store = createStore(reducers, getFrontEndMiddlewares())

export default store
