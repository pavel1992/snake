import {DIRECTION_CHANGED, GAME_FINISHED, GAME_STARTED} from '../constants'
import makeTick from '../../gameLogic/makeTick'
import {contains} from 'ramda'
import store, {Direction, OppositePairs} from '../store'
import {createGameAction} from '../actionCreators/gameActionCreator'


const DirectionKeys = [
    'ArrowUp',
    'ArrowLeft',
    'ArrowDown',
    'ArrowRight',
    ]


const listener = (event: KeyboardEvent) => {
    if (contains(event.key)(DirectionKeys)) {
        const newDirection = getDirection(event.key)
        if (!areOppositeDirections(newDirection, store.getState().gameState.direction))
            store.dispatch(createGameAction(DIRECTION_CHANGED, {direction: newDirection}))
    }
}

const getDirection = (key: string)  => {
    switch (key) {
        case 'ArrowUp':
            return Direction.TOP
        case 'ArrowDown':
            return Direction.BOTTOM
        case 'ArrowLeft':
            return Direction.LEFT
        case 'ArrowRight':
            return Direction.RIGHT
        default:
            break
    }
}

const areOppositeDirections = (nextDirection: Direction, prevDirection: Direction) =>
    contains({first: nextDirection, second: prevDirection})(OppositePairs)

export const runGameMiddleware = store => next => action => {

    if (action.type === GAME_STARTED) {
        window['gameRun'] = setInterval(() => makeTick(store.getState()), 500)
        window.addEventListener('keydown', listener, true)
    }
    if (action.type === GAME_FINISHED) {
        clearInterval(window['gameRun'])
        window.removeEventListener('keydown', listener)
    }

    return next(action)
}
