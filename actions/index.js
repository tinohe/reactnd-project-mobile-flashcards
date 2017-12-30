import { removeDecks, fetchDecks, createDeck, createCard } from '../api'

export const CLEAR_DECKS = 'CLEAR_DECKS'
export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function getDecks() {
    return function (dispatch) {
        return fetchDecks()
            .then((decks) => {
                return dispatch({
                    type: GET_DECKS,
                    decks
                })
            })
    }
}

export function deleteAllDecks() {
    return function (dispatch) {
        return removeDecks()
            .then(() => dispatch({
                type: CLEAR_DECKS
            }))
    }
}

export function addDeck(title) {
    return function (dispatch) {
        return createDeck(title)
            .then(() => {
                return dispatch({
                    type: ADD_DECK,
                    title
                })
            })
    }
}

export function addCard(cardData) {
    return function (dispatch) {
        return createCard(cardData)
            .then(() => {
                return dispatch({
                    type: ADD_CARD,
                    cardData
                })
            })
    }
}