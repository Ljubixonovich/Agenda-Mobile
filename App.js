import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import WelcomeScreen from './src/screens/Welcome/Welcome';
import store from './src/store/configureStore';
import startSingleScreenApp from './src/startSingleScreenApp';


Navigation.registerComponent('agenda.WelcomeScreen', () => WelcomeScreen, store, Provider);

// Start App
export default () => {
   startSingleScreenApp();
}
