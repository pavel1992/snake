import * as React from 'react'
import {Provider} from 'react-redux'
import store from './store/store'
import Settings from './components/Settings'
import Grid from './components/GameField'
import Score from './components/ScoreBoard'
import styled from 'styled-components'

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

export default () =>
    <Provider store={store}>
        <FlexContainer>
            <Settings/>
            <Grid/>
            <Score/>
        </FlexContainer>
    </Provider>
