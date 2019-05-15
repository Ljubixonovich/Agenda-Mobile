import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import WelcomeScreen from './src/screens/Welcome/Welcome';
import DayScreen from './src/screens/Day/Day';
import WeekScreen from './src/screens/Week/Week';
import MonthScreen from './src/screens/Month/Month';
import store from './src/store/configureStore';
import startSingleScreenApp from './src/startSingleScreenApp';


Navigation.registerComponent('agenda.WelcomeScreen', () => WelcomeScreen, store, Provider);

Navigation.registerComponent('agenda.DayScreen', () => DayScreen, store, Provider);
Navigation.registerComponent('agenda.WeekScreen', () => WeekScreen, store, Provider);
Navigation.registerComponent('agenda.MonthScreen', () => MonthScreen, store, Provider);


// Start App
export default () => {
   startSingleScreenApp();
}
