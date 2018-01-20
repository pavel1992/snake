import * as React from 'react'
import {Provider} from 'react-redux'
import store from './store/store'
import Settings from './components/Settings'
import Grid from './components/GameField'


export default () =>
    <Provider store={store}>
        <div>
            <Settings/>
            <Grid/>
        </div>
    </Provider>
