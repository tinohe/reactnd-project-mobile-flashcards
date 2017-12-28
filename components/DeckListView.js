import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'

import Deck from './Deck'

class DeckListView extends React.Component {

    render = () => {
        const { decks, navigation } = this.props
        return (
            <View style={styles.container}>
                {!this.areDecksAvailable() && <Text style={styles.text} >Sorry, no decks available yet!</Text>}
                {this.areDecksAvailable() && <FlatList
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