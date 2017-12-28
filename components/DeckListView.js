import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { orange, white } from '../utils/colors'

import Deck from './Deck'

class DeckListView extends React.Component {

    render = () => {
        const { decks, navigation } = this.props
        return (
            <View style={styles.container}>
                {decks.length > 0 &&
                    <View>
                        {decks.map((deck) => (
                            <Deck key={deck.title} deck={deck} navigation={navigation} />
                        ))}
                    </View>
                }
                {decks.length === 0 &&
                    <Text style={styles.text} >Sorry, no decks available yet!</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    text: {
        textAlign: 'center',
        fontSize: 26
    }
})

mapStateToProps = (decks) => {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckListView)