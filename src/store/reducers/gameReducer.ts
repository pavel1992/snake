import { defaultState, GameState} from '../store'
import {GameAction} from '../actionCreators/gameActionCreator'
import {GAME_STARTED} from '../constants'

export default (state: GameState = defaultState.gameState, action: GameAction): GameState => {
    switch (action.type) {
        case GAME_STARTED:
            return {
                    ...state,
                    gameInProgress: true,
                    firstRun: false,
                    score: 0,
            }
        default: return state
    }
}
