import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { darkOrange, orange, white, darkBlue, lightBlue, grayBlue, lightGreen, lightRed, darkGreen, darkRed } from '../utils/colors'
import TextButton from './TextButton'

import Deck from './Deck'

class CardView extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Quiz'
        }
    }

    state = {
        cardIndex: 0,
        noOfCorrectAnswers: 0,
        showAnswer: false,
        showResult: false
    }

    resetState = () => {
        this.setState(() => ({
            cardIndex: 0,
            noOfCorrectAnswers: 0,
            showAnswer: false,
            showResult: false
        }))
    }

    render = () => {
        return (
            <View style={styles.mainContainer}>
                {this.state.showResult && this.createResultComponent()}
                {!this.state.showResult && this.createQuestionAnswerComponent()}
            </View>
        )
    }

    createResultComponent = () => {
        const { deck } = this.props
        const totalCardCount = deck.cards.length

        return <View>
            <Text style={styles.scoreHeadline}>Your final score for deck '{deck.title}':</Text>
            <Text style={styles.scoreResult}>{this.state.noOfCorrectAnswers} out of {totalCardCount} answers were correct!</Text>
            <View style={styles.buttonContainer}>
                <TextButton style={styles.backToDeck} onPress={this.onBackToDeck}>Back to deck</TextButton>
                <TextButton style={styles.restart} onPress={this.onRestart}>Restart quiz</TextButton>
            </View>
        </View>
    }

    createQuestionAnswerComponent = () => {
        const { deck } = this.props
        const totalCardCount = deck.cards.length
        const card = deck.cards[this.state.cardIndex]

        return <View>
            <Text style={styles.progress}>{this.state.cardIndex + 1}/{totalCardCount}</Text>
            <View style={styles.questionAnswerContainer}>
                <Text style={styles.questionAnswer}>{this.state.showAnswer ? card.answer : card.question}</Text>
                <View style={styles.buttonContainer}>
                    <TextButton style={styles.toggleAnswer} onPress={this.onToggleAnswer}>{this.state.showAnswer ? 'Show question' : 'Show answer'}</TextButton>
                </View>
                {this.state.showAnswer && this.createAnswerButtons()}
            </View>
        </View>
    }

    createAnswerButtons = () => {
        return <View style={styles.buttonContainer}>
            <TextButton style={styles.correct} onPress={this.onCorrect}>Correct</TextButton>
            <TextButton style={styles.incorrect} onPress={this.onIncorrect}>Incorrect</TextButton>
        </View>
    }

    onRestart = () => {
        this.resetState()
    }

    onBackToDeck = () => {
        this.props.navigation.navigate('DeckView', { deckTitle: this.props.deck.title })
    }

    onToggleAnswer = () => {
        this.setState((state) => ({ showAnswer: !state.showAnswer }))
    }

    onCorrect = () => {
        this.setState(state => ({ noOfCorrectAnswers: state.noOfCorrectAnswers + 1 }))
        this.onNext()
    }

    onIncorrect = () => {
        this.onNext()
    }

    onNext = () => {
        if (this.state.cardIndex + 1 < this.props.deck.cards.length) {
            this.setState((state) => ({ cardIndex: state.cardIndex + 1, showAnswer: false }))
        }
        else {
            this.setState(() => ({ showResult: true }))
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 20
    },
    scoreHeadline: {
        fontSize: 26,
        color: darkBlue,
        textAlign: 'center'
    },
    scoreResult: {
        fontSize: 18,
        color: darkBlue,
        textAlign: 'center',
        marginTop: 20
    },
    progress: {
        fontSize: 14,
        color: darkBlue
    },
    questionAnswerContainer: {
        marginTop: 50
    },
    questionAnswer: {
        textAlign: 'center',
        color: darkBlue,
        fontSize: 26
    },
    buttonContainer: {
        justifyContent: 'center',
        padding: 50,
    },
    toggleAnswer: {
        backgroundColor: white,
        color: orange,
        borderColor: orange,
        margin: 5,
    },
    correct: {
        backgroundColor: lightGreen,
        borderColor: darkGreen,
        color: darkGreen,
        margin: 5,
    },
    incorrect: {
        backgroundColor: lightRed,
        borderColor: darkRed,
        color: darkRed,
        margin: 5,
    },
    restart: {
        backgroundColor: orange,
        color: white,
        borderColor: orange,
        margin: 5,
    },
    backToDeck: {
        backgroundColor: white,
        color: orange,
        borderColor: orange,
        margin: 5,
    }
})

mapStateToProps = (decks, { navigation }) => {
    const { deckTitle } = navigation.state.params
    return {
        deck: decks.find((d) => (d.title === deckTitle))
    }
}

export default connect(mapStateToProps)(CardView)