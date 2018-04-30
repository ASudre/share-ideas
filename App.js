// @flow

import React from 'react';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { Root } from 'native-base';

import reducer from './src/reducers/ideas.reducer';
import HomeScreen from './src/containers/Home.container';
import FormScreen from './src/containers/Form.container';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  {
    ideas: {}, savingIdea: false, deletingIdea: false, loadingIdeas: false,
  },
  composeEnhancers(applyMiddleware(thunk)),
);

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Form: { screen: FormScreen },
});

export default function App() {
  return (
    <Provider store={store}>
      <Root>
        <AppNavigator />
      </Root>
    </Provider>
  );
}
