import React, {Component} from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, darkBlue, lightBlue, grayBlue } from '../utils/colors'

export default class Deck extends Component {


    render = () => {
        const { deck } = this.props

        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.questions}>{deck.questions.length} cards</Text>
            </TouchableOpacity>

        )
    }

    onPress = () => {
        //alert(this.props.deck.title)
        //alert(this.props.navigation)
        this.props.navigation.navigate('DeckView', {deckTitle: this.props.deck.title})
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: grayBlue,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: darkBlue,
        margin: 15,
        padding: 5
    },
    title: {
        textAlign: 'center',
        color: grayBlue,
        fontSize: 18
    },
    questions: {
        textAlign: 'center',
        color: lightBlue,
        fontSize: 12
    }
})