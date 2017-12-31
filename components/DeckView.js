import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { darkOrange, orange, white, darkBlue, lightBlue, grayBlue } from '../utils/colors'
import {getCardsText} from '../utils/utils'
import TextButton from './TextButton'
import Deck from './Deck'
import ButtonContainer from './ButtonContainer'


class DeckView extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.deckTitle
        }
    }

    render = () => {
        const { deck } = this.props

        return (
            <View style={styles.mainContainer}>
                {deck &&
                    <View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{deck.title}</Text>
                            <Text style={styles.cards}>{deck.cards.length} {getCardsText(deck.cards.length)}</Text>
                        </View>
                        <ButtonContainer>
                            <TextButton style={styles.addCard} onPress={this.onAddCard}>Add card</TextButton>
                            <TextButton style={styles.startQuiz} onPress={this.onStartQuiz}>Start quiz</TextButton>
                        </ButtonContainer>
                    </View>
                }
            </View>
        )
    }

    onNavigateBack = () => {
        // Workaround to update the card-count in the view, because react-navigation doesn't re-render automatically upon a goBack(). 
        this.forceUpdate()
    }

    onAddCard = () => {
        this.props.navigation.navigate('NewCardView', { deckTitle: this.props.deck.title, onNavigateBack: this.onNavigateBack })
    }

    onStartQuiz = () => {
        if (this.props.deck.cards.length === 0) {
            Alert.alert(
                'Sorry, no cards available yet!',
                'Please create at least one card for this deck to start a quiz',
                [
                    { text: 'OK' },
                ],
                { cancelable: false }
            )
        } else {
            this.props.navigation.navigate('CardView', { deckTitle: this.props.deck.title })
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-around',
        margin: 20
    },
    textContainer: {
    },
    title: {
        textAlign: 'center',
        color: darkBlue,
        fontSize: 26
    },
    cards: {
        textAlign: 'center',
        color: lightBlue,
        fontSize: 18
    },
    buttonContainer: {
        justifyContent: 'center',
        padding: 50,
    },
    addCard: {
        backgroundColor: white,
        color: orange,
        borderColor: orange,
        margin: 5,
    },
    startQuiz: {
        backgroundColor: orange,
        color: white,
        borderColor: orange,
        margin: 5,
    }
})

mapStateToProps = (decks, { navigation }) => {
    const { deckTitle } = navigation.state.params
    return {
        deck: decks.find((d) => (d.title === deckTitle))
    }
}

export default connect(mapStateToProps)(DeckView)