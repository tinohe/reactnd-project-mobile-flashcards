import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { white, darkBlue, lightBlue, grayBlue } from '../utils/colors'
import { getCardsText } from '../utils/utils'

export default class Deck extends Component {

    state = { bounceValue: new Animated.Value(1) }

    render = () => {
        const { deck } = this.props
        const noOfCards = deck.cards ? deck.cards.length : 0

        return (
            <Animated.View style={[{ transform: [{ scale: this.state.bounceValue }] }]}>
                <TouchableOpacity style={styles.container} onPress={this.onPress}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.cards}>{noOfCards} {getCardsText(noOfCards)}</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    onPress = () => {
        Animated.sequence([
            Animated.timing(this.state.bounceValue, { duration: 100, toValue: 1.5 }),
            Animated.timing(this.state.bounceValue, { duration: 100, toValue: 1 })
        ]).start((finished) => this.props.navigation.navigate('DeckView', { deckTitle: this.props.deck.title }))
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