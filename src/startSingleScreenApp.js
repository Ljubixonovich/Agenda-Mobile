import { Navigation } from 'react-native-navigation';

import { getToday } from './helpers/dates';


const startSingleScreenApp = () => {
   Navigation.startSingleScreenApp({
      screen: {
         screen: 'agenda.DayContainer',
         title: 'Agenda'
      },
      appStyle: {
         orientation: 'portrait',
         navBarTitleTextCentered: true,
      },
      passProps: {
         date: getToday()
      }
   });
}

export default startSingleScreenApp;