import * as React from 'react'
import {AppState, GameState} from '../store/store'
import {connect} from 'react-redux'

const Score = (props: Partial<GameState>) => <div>{props.gameInProgress && `Всего набрано очков: ${props.score}`}</div>

const mapStateToProps = (state: AppState) =>
    ({
        score: state.gameState.score,
        gameInProgress: state.gameState.gameInProgress,
    })

export default connect(mapStateToProps)(Score)
