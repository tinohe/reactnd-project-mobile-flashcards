import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'DECK_STORE'

export function createDeck(deckTitle) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [deckTitle]: { title: deckTitle, cards: [{ question: 'q1', answer: 'a1' }] }
    }))
}

export function fetchDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => {
            return JSON.parse(results)
        })
        .then((decks) => (Object.keys(decks).map(key => decks[key])))
}

export function removeDecks() {
    return AsyncStorage.removeItem(STORAGE_KEY)
}