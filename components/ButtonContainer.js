import React from 'react'
import { View, StyleSheet } from 'react-native'

export default ButtonContainer = ({ children, style = {} }) => {
    return (
        <View style={[styles.buttonContainer, style,]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 50,
    },
})