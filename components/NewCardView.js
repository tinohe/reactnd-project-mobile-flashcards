import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Keyboard, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import TextInputWithCharCount from './TextInputWithCharCount'
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
                <TextInputWithCharCount placeholder='Question' maxLength={maxLength} value={this.state.question} onChangeText={(text) => this.setState({ question: text })} style={styles.input} />
                <TextInputWithCharCount placeholder='Answer' maxLength={maxLength}  value={this.state.answer} onChangeText={(text) => this.setState({ answer: text })} style={styles.input}/>
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
        marginTop: 5,
        marginBottom: 5,
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