import { ADD_DECK, ADD_QUESTION } from '../actions'


export default function decks(state = [], action) {

    switch (action.type) {
        case ADD_DECK: {
            return state.concat({ title: action.title, questions: [] })
        }
        case ADD_QUESTION: {

            return state.map((deck) => {
                if (deck.title === action.questionData.deckTitle) {
                    deck.questions = deck.questions.concat({ question: action.questionData.question, answer: action.questionData.answer })
                    return { ...deck }
                } else {
                    return deck
                }
            })
        }

        default: return state
    }
}