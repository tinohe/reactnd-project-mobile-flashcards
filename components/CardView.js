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
        showAnswer: false
    }

    render = () => {
        const { deck } = this.props
        const totalCardCount = deck.cards.length
        const card = deck.cards[this.state.cardIndex]

        return (
            <View style={styles.mainContainer}>
                <Text style={styles.progress}>{this.state.cardIndex + 1}/{totalCardCount}</Text>
                <View style={styles.questionAnswerContainer}>
                    <Text style={styles.questionAnswer}>{this.state.showAnswer ? card.answer : card.question}</Text>
                    <View style={styles.buttonContainer}>
                        <TextButton style={styles.toggleAnswer} onPress={this.onToggleAnswer}>{this.state.showAnswer ? 'Show question' : 'Show answer'}</TextButton>
                    </View>
                    {this.state.showAnswer &&
                        <View style={styles.buttonContainer}>
                            <TextButton style={styles.correct} onPress={this.onNext}>Correct</TextButton>
                            <TextButton style={styles.incorrect} onPress={this.onNext}>Incorrect</TextButton>
                        </View>
                    }
                </View>
            </View>
        )
    }

    onToggleAnswer = () => {
        this.setState((state) => ({ showAnswer: !state.showAnswer }))
    }

    onNext = () => {
        if (this.state.cardIndex + 1 < this.props.deck.cards.length) {
            this.setState((state) => ({ cardIndex: state.cardIndex + 1, showAnswer: false }))
        }
        else {
            alert('showing result')
            //this.props.navigation.navigate('NewCardView', { deckTitle: this.props.deck.title, onNavigateBack: this.onNavigateBack })
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 20
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
})

mapStateToProps = (decks, { navigation }) => {
    const { deckTitle } = navigation.state.params
    return {
        deck: decks.find((d) => (d.title === deckTitle))
    }
}

export default connect(mapStateToProps)(CardView)