import React, {Component} from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, darkBlue, lightBlue, grayBlue } from '../utils/colors'
import { getCardsText } from '../utils/utils'

export default class Deck extends Component {


    render = () => {
        const { deck } = this.props
        const noOfCards = deck.cards ? deck.cards.length : 0

        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.cards}>{noOfCards} {getCardsText(noOfCards)}</Text>
            </TouchableOpacity>

        )
    }

    onPress = () => {
        this.props.navigation.navigate('DeckView', {deckTitle: this.props.deck.title})
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: grayBlue,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: darkBlue,
        marginTop: 5,
        marginBottom: 5,
        padding: 10
    },
    title: {
        textAlign: 'center',
        color: grayBlue,
        fontSize: 18
    },
    cards: {
        textAlign: 'center',
        color: lightBlue,
        fontSize: 12
    }
})