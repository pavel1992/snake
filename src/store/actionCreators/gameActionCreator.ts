import {GAME_FINISHED, GAME_STARTED, DIRECTION_CHANGED, SNAKE_MOVED} from '../constants'
import {GameState} from '../store'

type GameActionType = GAME_STARTED | GAME_FINISHED | DIRECTION_CHANGED | SNAKE_MOVED

export type GameAction = {
    type: GameActionType
    payload: Partial<GameState>
}

export const createGameAction = (type: GameActionType, payload: Partial<GameState>): GameAction =>
    ({
        type,
        payload,
    })
