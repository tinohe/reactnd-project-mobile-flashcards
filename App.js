import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { darkBlue, lightBlue, grayBlue, white, orange } from './utils/colors'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'

export default class App extends React.Component {

  render = () => {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MyStatusBar backgroundColor={darkBlue} barStyle="light-content" />
          <Tabs />
        </View>
      </Provider>
    )
  }
}

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New deck',
      },
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: darkBlue,
      },
    }
  }
)

MyStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

