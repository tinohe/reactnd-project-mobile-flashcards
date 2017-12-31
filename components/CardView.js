import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { darkOrange, orange, white, darkBlue, lightBlue, grayBlue, lightGreen, lightRed, darkGreen, darkRed } from '../utils/colors'
import TextButton from './TextButton'

import Deck from './Deck'
import ButtonContainer from './ButtonContainer'

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
        showResult: false,
        bounceValue: new Animated.Value(1),
        opacity: new Animated.Value(0),
    }

    resetState = () => {
        this.setState(() => ({
            cardIndex: 0,
            noOfCorrectAnswers: 0,
            showAnswer: false,
            showResult: false,
            bounceValue: new Animated.Value(1),
            opacity: new Animated.Value(0),
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
            <Text style={styles.scoreHeadline}>Your final score for deck</Text>
            <Text style={styles.scoreDeckTitle}>'{deck.title}':</Text>
            <Text style={styles.scoreResult}>{this.state.noOfCorrectAnswers} out of {totalCardCount} answers were correct!</Text>
            <ButtonContainer>
                <TextButton style={styles.backToDeck} onPress={this.onBackToDeck}>Back to deck</TextButton>
                <TextButton style={styles.restart} onPress={this.onRestart}>Restart quiz</TextButton>
            </ButtonContainer>
        </View>
    }

    createQuestionAnswerComponent = () => {
        const { deck } = this.props
        const totalCardCount = deck.cards.length
        const card = deck.cards[this.state.cardIndex]
        const { opacity } = this.state

        return <View>
            <Text style={styles.progress}>{this.state.cardIndex + 1}/{totalCardCount}</Text>
            <View style={styles.questionAnswerContainer}>
                <Animated.Text
                    style={[styles.questionAnswer, { transform: [{ scale: this.state.bounceValue }] }]}>
                    {this.state.showAnswer ? card.answer : card.question}
                </Animated.Text>
                <ButtonContainer>
                    <TextButton style={styles.toggleAnswer} onPress={this.onToggleAnswer}>{this.state.showAnswer ? 'Show question' : 'Show answer'}</TextButton>
                </ButtonContainer>
                <Animated.View style={{ opacity }}>
                    <ButtonContainer>
                        <TextButton style={styles.correct} onPress={this.onCorrect} disabled={!this.state.showAnswer}>Correct</TextButton>
                        <TextButton style={styles.incorrect} onPress={this.onIncorrect} disabled={!this.state.showAnswer}>Incorrect</TextButton>
                    </ButtonContainer>
                </Animated.View>
            </View>
        </View>
    }

    onRestart = () => {
        this.resetState()
    }

    onBackToDeck = () => {
        this.props.navigation.goBack()
    }

    onToggleAnswer = () => {
        const targetOpacity = this.state.showAnswer ? 0 : 1
        this.setState((state) => ({ showAnswer: !state.showAnswer }))
        Animated.parallel([
            Animated.sequence([
                Animated.timing(this.state.bounceValue, { duration: 400, toValue: 2 }),
                Animated.spring(this.state.bounceValue, { toValue: 1, friction: 4 })]),
            Animated.timing(this.state.opacity, { duration: 400, toValue: targetOpacity })
        ]).start()


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
    scoreDeckTitle: {
        fontSize: 26,
        color: darkBlue,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10
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
    toggleAnswer: {
        backgroundColor: orange,
        color: white,
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