import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Keyboard, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { orange, white, darkBlue, lightBlue } from '../utils/colors'
import { addDeck } from '../actions'

import TextInputWithCharCount from './TextInputWithCharCount'

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
            this.setState({ title: '' })
            this.props.dispatch(addDeck(title))
            this.props.navigation.navigate('DeckView', { deckTitle: title })
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
            <KeyboardAvoidingView behavior='padding' style={styles.mainContainer}>
                <Text style={styles.text}>What is the title of your new deck?</Text>
                <View style={styles.inputContainer}>
                    <TextInputWithCharCount placeholder='Deck title' maxLength={maxLength} value={this.state.title} onChangeText={(text) => this.setState({ title: text })}/>
                    <TextButton style={styles.submit} onPress={this.onSubmit}>Submit</TextButton>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const maxLength = 50

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-around',
        margin: 20,
    },
    text: {
        textAlign: 'center',
        color: darkBlue,
        fontSize: 32
    },
    inputContainer: {
        flex: 1,
        marginTop: 20,
        padding: 20,
    },
    input: {
        borderColor: orange,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },

    submit: {
        color: white,
        backgroundColor: orange,
        borderColor: orange,
        margin: 40
    }
})

const mapStateToProps = (decks) => {
    return { decks }
}

export default connect(mapStateToProps)(NewDeckView)