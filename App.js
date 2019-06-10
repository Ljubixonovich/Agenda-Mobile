import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import WelcomeScreen from './src/screens/Welcome/Welcome';
import DayScreen from './src/screens/Day/Day';
import DayContainer from './src/screens/Day/DayContainer';
import WeekScreen from './src/screens/Week/Week';
import MonthScreen from './src/screens/Month/Month';
import TaskFormScreen from './src/screens/Task/TaskForm';
import store from './src/store/configureStore';
import startSingleScreenApp from './src/startSingleScreenApp';
import PopupMenu from './src/components/PopupMenu/PopupMenu';


Navigation.registerComponent('agenda.WelcomeScreen', () => WelcomeScreen, store, Provider);

Navigation.registerComponent('agenda.DayContainer', () => DayContainer, store, Provider);
Navigation.registerComponent('agenda.DayScreen', () => DayScreen, store, Provider);
Navigation.registerComponent('agenda.WeekScreen', () => WeekScreen, store, Provider);
Navigation.registerComponent('agenda.MonthScreen', () => MonthScreen, store, Provider);
Navigation.registerComponent('agenda.TaskFormScreen', () => TaskFormScreen, store, Provider);
Navigation.registerComponent('agenda.PopupMenu', () => PopupMenu, store, Provider);

// Start App
export default () => {
   startSingleScreenApp('agenda.DayContainer');
}
