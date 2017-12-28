import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { orange, white, darkBlue, lightBlue, grayBlue } from '../utils/colors'

import Deck from './Deck'

class DeckView extends React.Component {

    render = () => {
        const { deck } = this.props
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.questions}>{deck.questions.length} cards</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        padding: 5
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
    }
})

mapStateToProps = (decks, { navigation }) => {
    const { deckTitle } = navigation.state.params
    return {
        deck: decks.find((d) => (d.title === deckTitle))
    }
}

export default connect(mapStateToProps)(DeckView)