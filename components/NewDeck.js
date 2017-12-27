import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { orange, white } from '../utils/colors'
import { addDeck } from '../actions'

class NewDeck extends React.Component {

    state = {
        title: ''
    }

    onSubmit = () => {
        this.props.dispatch(addDeck(this.state.title))
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

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(NewDeck)