import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'


export default function TextButton({ children, onPress, disabled = false, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Text style={[styles.button, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    }
})