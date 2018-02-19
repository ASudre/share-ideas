import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import {
  StackNavigator,
} from 'react-navigation';

import reducer from './src/reducers/ideas.reducer';
import HomeScreen from './src/components/Home.component';
import { FormView } from './src/components/Form.component';

const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Form: { screen: FormView },
});

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
    shareIdeas: {
      ideas: [],
    }
  }
};

const AppWithNavigationState = connect(mapStateToProps)(App);

class Root extends React.Component {
  render() {
    return (
      <App />
    );
  }
}
