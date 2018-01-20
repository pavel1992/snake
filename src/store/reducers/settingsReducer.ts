import {AppState, defaultState, Settings} from '../store'
import {SettingsAction} from '../actionCreators/settingsActionCreator'
import {SETTINGS_CHANGED} from '../constants'

const settingsReducer = (state: Settings = defaultState.settings, action: SettingsAction): Settings =>
    action.type === SETTINGS_CHANGED ?
    ({
        ...state,
         ...action.payload,
    }) : state


export default settingsReducer
