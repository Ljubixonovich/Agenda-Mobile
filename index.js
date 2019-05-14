import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import {name as appName} from './app.json';

import App from './App';
import store from './src/store/configureStore';

console.disableYellowBox = ['Warning:'];

App();

const RNRedux = () => {
   <Provider store={store}>
      <App />
   </Provider>
};


AppRegistry.registerComponent(appName, () => RNRedux);
