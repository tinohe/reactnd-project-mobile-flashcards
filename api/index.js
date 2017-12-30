import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'DECK_STORE'

export function createDeck(deckTitle) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [deckTitle]: { title: deckTitle, cards: [] }
    }))
}

export function createCard(cardData) {
    return fetchDeck(cardData.deckTitle)
        .then(deck => {
            deck.cards = deck.cards.concat({ question: cardData.question, answer: cardData.answer })
            AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
                [cardData.deckTitle]: { cards: deck.cards }
            }))
        })
}

export function fetchDeck(deckTitle) {
    return fetchDecks()
        .then(decks => decks.find(deck => deck.title === deckTitle))
}

export function fetchDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => {
            return JSON.parse(results)
        })
        .then((decks) => (decks ? Object.keys(decks).map(key => decks[key]) : []))
}

export function removeDecks() {
    return AsyncStorage.removeItem(STORAGE_KEY)
}