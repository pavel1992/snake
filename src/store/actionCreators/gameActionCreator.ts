import {GameState} from '../store'


export type GameAction = {
    type: string
    payload: Partial<GameState>
}

export const createGameAction = (type: string, payload?: Partial<GameState>): GameAction =>
    ({
        type,
        payload,
    })
