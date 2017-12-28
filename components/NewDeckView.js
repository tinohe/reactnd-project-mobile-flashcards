import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Keyboard  } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { orange, white } from '../utils/colors'
import { addDeck } from '../actions'

class NewDeckView extends React.Component {

    state = {
        title: ''
    }

    onSubmit = () => {
        const title = this.state.title

        if (title.length === 0) {
            this.showMissingTitleAlert()
        }
        else if (this.props.decks.some((deck) => (deck.title === title))) {
            this.showDuplicateTitleAlert()
        }
        else {
            Keyboard.dismiss()
            this.setState({title: ''})
            this.props.dispatch(addDeck(title))
            this.props.navigation.navigate('DeckView', {deckTitle: title})
        }
    }

    showMissingTitleAlert = () => {
        Alert.alert(
            'Missing title!',
            'Please enter a title for this deck',
            [{ text: 'OK' }],
            { cancelable: false }
        )
    }

    showDuplicateTitleAlert = () => {
        Alert.alert(
            'A deck with this title already exists!',
            'Please enter a different title for this deck',
            [{ text: 'OK' }],
            { cancelable: false }
        )
    }

    render = () => {

        return (
            <View>
                <Text style={styles.text}>What is the title of your new deck?</Text>
                <TextInput defaultValue='Deck title' maxLength={255} style={styles.input} value={this.state.title} onChangeText={(text) => this.setState({ title: text })}></TextInput>
                <TextButton style={styles.submit} onPress={this.onSubmit}>Submit</TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        margin: 10,
    },
    input: {
        borderColor: orange,
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 10
    },
    submit: {
        color: white,
        backgroundColor: orange,
        borderColor: orange,
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 10
    }
})

const mapStateToProps = (decks) => {
    return { decks }
}

export default connect(mapStateToProps)(NewDeckView)