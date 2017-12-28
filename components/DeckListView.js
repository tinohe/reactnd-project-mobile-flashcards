import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { orange, white } from '../utils/colors'

import Deck from './Deck'

class DeckListView extends React.Component {

    render = () => {
        const { decks, navigation } = this.props
        return (
            <View>
                {decks.length > 0 &&
                    decks.map((deck) => (
                        <Deck key={deck.title} deck={deck} navigation={navigation}/>
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

export default connect(mapStateToProps)(DeckListView)