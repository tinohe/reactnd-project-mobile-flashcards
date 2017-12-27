import { ADD_DECK } from '../actions'


export default function decks(state = [], action) {
    
    switch (action.type) {
        case ADD_DECK: {
            return state.concat({title: action.title, questions: []})
        }

        default: return state
    }
}