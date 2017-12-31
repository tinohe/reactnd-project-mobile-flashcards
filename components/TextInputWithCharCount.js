import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import TextButton from './TextButton'
import { lightBlue, orange, darkBlue } from '../utils/colors'

export default NewDeckView = ({ maxLength, placeholder, value, onChangeText, style = {} }) => {

    return (
        <View>
            <TextInput placeholder={placeholder} maxLength={maxLength} style={[style, styles.input]} value={value} onChangeText={onChangeText}></TextInput>
            <Text style={styles.charCount}>{maxLength - value.length} chars left</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        color: darkBlue,
        borderColor: orange,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },
    charCount: {
        textAlign: 'center',
        color: lightBlue,
        marginTop: 5
    }
})