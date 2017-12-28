import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { darkOrange, orange, white, darkBlue, lightBlue, grayBlue } from '../utils/colors'
import TextButton from './TextButton'

import Deck from './Deck'

class DeckView extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.deckTitle
        }
    }

    render = () => {
        const { deck } = this.props
        return (
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.questions}>{deck.questions.length} cards</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TextButton style={styles.addCard} onPress={this.onAddCard}>Add card</TextButton>
                    <TextButton style={styles.startQuiz} onPress={this.onStartQuiz}>Start quiz</TextButton>
                </View>
            </View>
        )
    }

    onAddCard = () => {
        alert('add card')
    }

    onStartQuiz = () => {
        alert('start quiz')
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },
    textContainer: {
    },
    title: {
        textAlign: 'center',
        color: darkBlue,
        fontSize: 26
    },
    questions: {
        textAlign: 'center',
        color: lightBlue,
        fontSize: 18
    },
    buttonContainer: {
        justifyContent: 'center',
        padding: 50,
    },
    addCard: {
        backgroundColor: white,
        color: orange,
        borderColor: orange,
        margin: 5,
    },
    startQuiz: {
        backgroundColor: orange,
        color: white,
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

export default connect(mapStateToProps)(DeckView)