import {GAME_FINISHED, GAME_STARTED} from '../constants'
import makeTick from '../../gameLogic/makeTick'

const listener = (event: KeyboardEvent) => {
    if (event.defaultPrevented)
        return // Do nothing if the event was already processed

    console.log(event)
}


export const runGameMiddleware = store => next => action => {

    if (action.type === GAME_STARTED) {
        window['gameRun'] = setInterval(() => makeTick(store.getState()), 500)
        window.addEventListener('keydown ', listener, true)
    }
    if (action.type === GAME_FINISHED) {
        clearInterval(window['gameRun'])
        window.removeEventListener('keydown ', listener)
    }

    return next(action)
}
