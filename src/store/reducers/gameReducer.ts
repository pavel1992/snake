import {defaultState, GameState, default as store} from '../store'
import {GameAction} from '../actionCreators/gameActionCreator'
import {FOOD_EATEN, GAME_FINISHED, GAME_STARTED, SNAKE_MOVED} from '../constants'
import {contains} from 'ramda'

export default (state: GameState = defaultState.gameState, action: GameAction): GameState => {
    switch (action.type) {
        case GAME_STARTED:
            return {
                    ...state,
                    gameInProgress: true,
                    firstRun: false,
                    score: 0,
            }
        case GAME_FINISHED:
            return {
                ...state,
                gameInProgress: false,
                snakePosition: [{x: 0, y: 0}],
                foodPosition: defaultState.gameState.foodPosition,
            }
        case SNAKE_MOVED:
            return {
                ...state,
                snakePosition: action.payload.snakePosition,
            }
        case FOOD_EATEN: {
            const allCoords = []
            for (let i = 0; i < store.getState().settings.rows; i++)
                for (let k = 0; k < store.getState().settings.columns; k ++)
                    allCoords.push({x: k, y: i})
            const freeCoords = allCoords.filter(coord => !contains(coord)(state.snakePosition))
            const newFoodIndex = Math.floor(Math.random() * freeCoords.length)
            return {
                ...state,
                foodPosition: freeCoords[newFoodIndex],
                score: state.score + 1,
            }
        }
        default: return state
    }
}
