import * as React from 'react'
import {AppState, Settings} from '../store/store'
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

const SettingsView = (props: Settings) =>
    <div>
        <TextField
            id='rowSize'
            label='Количество рядов, не меньше 2'
            value={props.rows}
            onChange={e => changeSettings(parseInt(e.target.value, 0), 'rows')}
        />
        <TextField
            id='rowSize'
            label='Количество столбцов, не меньше 2'
            value={props.columns}
            onChange={e => changeSettings(parseInt(e.target.value, 0), 'columns')}
        />
    </div>

const mapStateToProps = (state: AppState): Settings => ({
    rows: state.settings.rows,
    columns: state.settings.columns,
})

export default connect(mapStateToProps)(SettingsView)
