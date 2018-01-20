import * as React from 'react'
import {Provider} from 'react-redux'
import store from './store/store'
import Settings from './components/Settings'

export default () =>
    <Provider store={store}>
        <div>
            <Settings/>
        </div>
    </Provider>
