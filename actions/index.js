export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export function addDeck(title) {

    return {
        type: ADD_DECK,
        title
    }
}

export function addQuestion(questionData) {

    return {
        type: ADD_QUESTION,
        questionData
    }
}