import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { orange, white, darkBlue } from '../utils/colors'

import TextButton from './TextButton'

import { deleteAllDecks, getDecks } from '../actions'

import Deck from './Deck'

class DeckListView extends React.Component {

    componentDidMount = () => {
        this.props.dispatch(getDecks())
    }

    onDeleteAllDecks = () => {
        Alert.alert(
            'Really delete all decks?',
            'Decks cannot be restored',
            [
                { text: 'No' },
                { text: 'Yes', onPress: () => this.props.dispatch(deleteAllDecks())},
            ],
            { cancelable: false }
        )
       
    }

    render = () => {
        const { decks, navigation } = this.props

        return (
            <View style={styles.mainContainer}>
                {this.areDecksAvailable() &&
                    <View>
                        <TextButton style={styles.deleteAllDecks} onPress={this.onDeleteAllDecks}>Delete all decks</TextButton>
                        <Text style={styles.decks}>Available decks:</Text>
                        <FlatList
                            data={decks}
                            renderItem={({ item }) => <Deck key={item.title} deck={item} navigation={this.props.navigation} />}
                            keyExtractor={(deck, index) => (deck.title)} />
                    </View>}
                {!this.areDecksAvailable() && <Text style={styles.sorry} >Sorry, no decks available yet!</Text>}
            </View>
        )
    }

    areDecksAvailable = () => {
        return this.props.decks.length > 0
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 20
    },
    deleteAllDecks: {
        backgroundColor: orange,
        color: white,
        borderColor: orange,
        marginBottom: 20,
    },
    sorry: {
        textAlign: 'center',
        color: darkBlue,
        fontSize: 26
    },
    decks: {
        textAlign: 'center',
        color: darkBlue,
        fontSize: 14
    },
})

mapStateToProps = (decks) => {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckListView)