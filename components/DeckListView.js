import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'

import TextButton from './TextButton'

import { removeAllDecks, fetchDecks, createDeck } from '../api'
import { clearDecks, getDecks } from '../actions'

import Deck from './Deck'

class DeckListView extends React.Component {

    componentDidMount = () => {
        this.props.dispatch(getDecks())
    }

    onClear = () => {
        this.props.dispatch(clearDecks())
    }

    render = () => {
        const { decks, navigation } = this.props

        return (
            <View>
                {false && <TextButton onPress={this.onClear}>Clear </TextButton>}
                {!this.areDecksAvailable() && <Text style={styles.text} >Sorry, no decks available yet!</Text>}
                {this.areDecksAvailable() && <FlatList style={styles.list}
                    data={decks}
                    renderItem={({ item }) => <Deck key={item.title} deck={item} navigation={this.props.navigation} />}
                    keyExtractor={(deck, index) => (deck.title)} />}
            </View>
        )
    }

    areDecksAvailable = () => {
        return this.props.decks.length > 0
    }
}

const styles = StyleSheet.create({
    list: {
        margin: 20
    },
    text: {
        margin: 20,
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