import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { orange, white } from '../utils/colors'

class DeckList extends React.Component {

    render = () => {
        const { decks } = this.props
        return (
            <View>
                {decks.length > 0 &&
                    decks.map((deck) => (
                        <View key={deck.title}>
                            <Text>{deck.title}</Text>
                            <Text>{deck.questions.length} cards</Text>
                        </View>
                    ))

                }
                {decks.length === 0 &&
                    <Text>No decks available yet</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        color: orange,
    }
})

mapStateToProps = (decks) => {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)