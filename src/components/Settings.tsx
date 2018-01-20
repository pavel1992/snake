import * as React from 'react'
import {AppState, GameState, Settings} from '../store/store'
import TextField from 'material-ui/TextField'
import CreateSettingsAction from '../store/actionCreators/settingsActionCreator'
import { connect } from 'react-redux'
import store from '../store/store'

const changeSettings = (value: number, settingName: 'columns'| 'rows') => {
    let newValue = value || 2
    if (newValue < 2)
        newValue = 2
    store.dispatch(CreateSettingsAction({[settingName]: newValue}))
}

const SettingsView = (props: Settings & Partial<GameState>) =>
    <div>
        <TextField
            id='rowSize'
            label='Количество рядов, не меньше 2'
            value={props.rows}
            onChange={e => changeSettings(parseInt(e.target.value, 0), 'rows')}
            disabled={props.gameInProgress}
        />
        <TextField
            id='rowSize'
            label='Количество столбцов, не меньше 2'
            value={props.columns}
            onChange={e => changeSettings(parseInt(e.target.value, 0), 'columns')}
            disabled={props.gameInProgress}
        />
    </div>

const mapStateToProps = (state: AppState): Settings & Partial<GameState> => ({
    rows: state.settings.rows,
    columns: state.settings.columns,
    gameInProgress: state.gameState.gameInProgress,
})

export default connect(mapStateToProps)(SettingsView)
