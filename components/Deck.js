import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, darkBlue, lightBlue, grayBlue } from '../utils/colors'

export default function Deck({ deck }) {

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.questions}>{deck.questions.length} cards</Text>
        </TouchableOpacity>

    )
}

const onPress = () => {
    alert('pressed')
}

const styles = StyleSheet.create({
    container: {
        borderColor: grayBlue,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: darkBlue,
        margin: 15,
        padding: 5
    },
    title: {
        textAlign: 'center',
        color: grayBlue,
        fontSize: 20
    },
    questions: {
        textAlign: 'center',
        color: lightBlue,
        fontSize: 14
    }
})