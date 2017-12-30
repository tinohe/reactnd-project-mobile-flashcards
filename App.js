import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { darkBlue, lightBlue, grayBlue, white, orange } from './utils/colors'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'
import DeckView from './components/DeckView'
import NewCardView from './components/NewCardView'
import CardView from './components/CardView'

export default class App extends React.Component {

  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  createReduxStore = () => {
    return createStore(
      reducer,
      this.composeEnhancers(
        applyMiddleware(thunk)
      )
    )
  }

  render = () => {
    return (
      <Provider store={this.createReduxStore()}>
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
    navigationOptions: {
      header: null
    },

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
  },
  NewCardView: {
    screen: NewCardView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBlue,
      }
    }
  },
  CardView: {
    screen: CardView,
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

