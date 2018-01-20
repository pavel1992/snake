import {Settings} from '../store'
import {SETTINGS_CHANGED} from '../constants'

export type SettingsAction = {
    type: string,
    payload: Partial<Settings>
}

export default (payload: Partial<Settings>): SettingsAction => ({
    type: SETTINGS_CHANGED,
    payload,
})
