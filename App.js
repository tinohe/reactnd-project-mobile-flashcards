import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { darkBlue, lightBlue, grayBlue, white, orange } from './utils/colors'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'
import DeckView from './components/DeckView'

export default class App extends React.Component {

  render = () => {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MyStatusBar backgroundColor={darkBlue} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const Tabs = TabNavigator(
  {
    DeckListView: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: 'Decks',
      },
    },
    NewDeckView: {
      screen: NewDeckView,
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

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBlue,
      }
    }
  }
})

MyStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

