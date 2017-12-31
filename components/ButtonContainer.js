import React from 'react'
import { View, StyleSheet } from 'react-native'

export default ButtonContainer = ({ children }) => {
    return (
        <View style={styles.buttonContainer}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        padding: 50,
    },
})