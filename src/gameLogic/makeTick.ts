import {AppState, Coords, default as store, Direction, Settings} from '../store/store'
import {dropLast, head, last, prepend} from 'ramda'
import {createGameAction} from '../store/actionCreators/gameActionCreator'
import {FOOD_EATEN, GAME_FINISHED, SNAKE_MOVED} from '../store/constants'
import {equals, contains} from 'ramda'


const makeTick = ({gameState, settings}: AppState) => {
    const snakeHead = head(gameState.snakePosition)
    try {
        const nextCoords = getNextCellCoords(snakeHead, gameState.direction)
        const outOfRange = checkOutOfRange(nextCoords, settings)
        const eating = foodEat(nextCoords, gameState.foodPosition)
        const eatingYourself = eatYourself(nextCoords, gameState.snakePosition)
        if (eating) {
            const newSnakePosition = prepend(nextCoords)(gameState.snakePosition)
            store.dispatch(createGameAction(SNAKE_MOVED, {snakePosition: newSnakePosition}))
            store.dispatch(createGameAction(FOOD_EATEN))
            return
        }
        if (outOfRange || eatingYourself) {
            store.dispatch(createGameAction(GAME_FINISHED))
            return
        }
        const newSnakePosition = prepend(nextCoords)(dropLast(1, gameState.snakePosition))
        store.dispatch(createGameAction(SNAKE_MOVED, {snakePosition: newSnakePosition}))
    } catch (e) {
        console.error(e.toString())
    }
}

const getNextCellCoords = ({x, y}: Coords, direction: Direction) => {
    switch (direction) {
        case Direction.RIGHT:
            return {x: x + 1, y}
        case Direction.BOTTOM:
            return {x, y: y + 1}
        case Direction.LEFT:
            return {x: x - 1, y}
        case Direction.TOP:
            return {x, y: y - 1}
        default:
            throw Error('unbelievable, but wrong direction')
    }
}

const checkOutOfRange = ({x, y}: Coords, fieldSize: Settings): boolean =>
    x >= fieldSize.columns || y >= fieldSize.rows || x < 0 || y < 0

const foodEat = ({x, y}: Coords, foodPlace: Coords): boolean =>
    equals({x, y}, foodPlace)

const eatYourself = ({x, y}: Coords, snake: Array<Coords>): boolean =>
    contains({x, y})(snake)

export default makeTick
