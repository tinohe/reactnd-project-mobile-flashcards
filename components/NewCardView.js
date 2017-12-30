import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Keyboard, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import CharCount from './CharCount'
import TextButton from './TextButton'
import { orange, white } from '../utils/colors'
import { addCard } from '../actions'


class NewCardView extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add card'
        }
    }

    state = {
        question: '',
        answer: ''
    }

    onSubmit = () => {
        const { question, answer } = this.state
        const deckTitle = this.props.deckTitle

        if (question.length === 0) {
            this.showMissingQuestionAlert()
        }
        else if (answer.length === 0) {
            this.showMissingAnswerAlert()
        }
        else {
            Keyboard.dismiss()
            this.setState({ question: '', answer: '' })
            this.props.dispatch(addCard({ deckTitle, question, answer }))
            this.props.navigation.state.params.onNavigateBack()
            this.props.navigation.goBack()
        }
    }

    showMissingQuestionAlert = () => {
        Alert.alert(
            'Missing question!',
            'Please enter a question for this card',
            [{ text: 'OK' }],
            { cancelable: false }
        )
    }

    showMissingAnswerAlert = () => {
        Alert.alert(
            'Missing answer!',
            'Please enter an answer for this card',
            [{ text: 'OK' }],
            { cancelable: false }
        )
    }

    render = () => {

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.mainContainer}>
                <TextInput placeholder='Question' maxLength={50} style={styles.input} value={this.state.question} onChangeText={(text) => this.setState({ question: text })}></TextInput>
                <CharCount maxLength={maxLength} currentLength={this.state.question.length} />
                <TextInput placeholder='Answer' maxLength={50} style={styles.input} value={this.state.answer} onChangeText={(text) => this.setState({ answer: text })}></TextInput>
                <CharCount maxLength={maxLength} currentLength={this.state.answer.length} />
                <TextButton style={styles.submit} onPress={this.onSubmit}>Submit</TextButton>
            </KeyboardAvoidingView>
        )
    }
}

const maxLength = 50

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin: 20,
        padding: 20,
    },
    input: {
        borderColor: orange,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        padding: 10
    },
    submit: {
        color: white,
        backgroundColor: orange,
        borderColor: orange,
        margin: 40
    }
})

mapStateToProps = (decks, { navigation }) => {
    return {
        deckTitle: navigation.state.params.deckTitle
    }
}

export default connect(mapStateToProps)(NewCardView)