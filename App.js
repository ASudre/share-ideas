import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import reducer from './src/reducers/ideas.reducer';
import HomeScreen from './src/containers/Home.container';
import FormScreen from './src/containers/Form.container';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  { ideas: {}, savingIdea: false, deletingIdea: false, loadingIdeas: false },
  composeEnhancers(applyMiddleware(thunk))
);

const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Form: { screen: FormScreen }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
