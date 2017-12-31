import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { orange, white, darkBlue } from '../utils/colors'

import TextButton from './TextButton'

import { deleteAllDecks, getDecks } from '../actions'

import Deck from './Deck'
import ButtonContainer from './ButtonContainer';

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
                { text: 'Yes', onPress: () => this.props.dispatch(deleteAllDecks()) },
            ],
            { cancelable: false }
        )

    }

    render = () => {
        return (
            <View style={styles.mainContainer}>
                {this.areDecksAvailable() && this.createDecksAvailableComponent()}
                {!this.areDecksAvailable() && this.createNoDecksAvailableComponent()}
            </View>
        )
    }

    areDecksAvailable = () => {
        return this.props.decks.length > 0
    }

    createDecksAvailableComponent = () => {
        return <View style={{ flex: 1 }}>
            <ButtonContainer style={{ paddingBottom: 20, paddingTop: 0 }}>
                <TextButton style={styles.deleteAllDecks} onPress={this.onDeleteAllDecks}>Delete all decks</TextButton>
            </ButtonContainer>
            <Text style={styles.decks}>Available decks:</Text>
            <FlatList
                data={this.props.decks}
                renderItem={({ item }) => <Deck key={item.title} deck={item} navigation={this.props.navigation} />}
                keyExtractor={(deck, index) => (deck.title)} />
        </View>
    }

    createNoDecksAvailableComponent = () => {
        return <Text style={styles.sorry} >Sorry, no decks available yet!</Text>
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin: 20
    },
    deleteAllDecks: {
        backgroundColor: orange,
        color: white,
        borderColor: orange,
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