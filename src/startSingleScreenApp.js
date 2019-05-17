import { Navigation } from 'react-native-navigation';

import { getToday } from './helpers/dates';


const startSingleScreenApp = () => {
   Navigation.startSingleScreenApp({
      screen: {
         screen: 'agenda.DayScreen',
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