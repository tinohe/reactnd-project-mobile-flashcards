import React from 'react'
import { Text,  StyleSheet } from 'react-native'
import { lightBlue } from '../utils/colors'


export default function CharCount({ maxLength, currentLength, style = {} }) {
  return (
    <Text style={styles.charCount}>{maxLength - currentLength} chars left</Text>
  )
}

const styles = StyleSheet.create({
  charCount: {
    textAlign: 'center',
    color: lightBlue,
    marginTop: 5
  }
})