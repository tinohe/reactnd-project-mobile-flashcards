import { ADD_DECK, ADD_CARD } from '../actions'


export default function decks(state = [], action) {

    switch (action.type) {
        case ADD_DECK: {
            return state.concat({ title: action.title, cards: [] })
        }
        case ADD_CARD: {

            return state.map((deck) => {
                if (deck.title === action.cardData.deckTitle) {
                    deck.cards = deck.cards.concat({ question: action.cardData.question, answer: action.cardData.answer })
                    return { ...deck }
                } else {
                    return deck
                }
            })
        }

        default: return state
    }
}