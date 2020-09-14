import * as React from 'react';
import Navs from './components/navs/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers/index';

import { handleGetDecks } from './actions/index';
import Background from './components/shared/background';
import { setLocalNotification } from './utils/AppNotification';
import { StatusBar } from 'react-native';

const store = createStore(reducers, applyMiddleware(thunk));
store.dispatch(handleGetDecks());

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    store.subscribe(() => this.forceUpdate());

    return (
      <Background>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#00BCD4"
          translucent={true}
        />
        <Provider store={store}>
          <Navs />
        </Provider>
      </Background>
    );
  }
}
