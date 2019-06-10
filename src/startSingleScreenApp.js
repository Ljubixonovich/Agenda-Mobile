import { Navigation } from 'react-native-navigation';

import { getToday } from './helpers/dates';


const startSingleScreenApp = (screen) => {
   if (screen === 'agenda.WeekScreen') {
      Navigation.startSingleScreenApp({
         screen: {
            screen: 'agenda.WeekScreen',
            title: 'Agenda'
         },
         appStyle: {
            orientation: 'portrait',
            navBarTitleTextCentered: true,
         },
      });
   } else if (screen === 'agenda.DayContainer') {
      Navigation.startSingleScreenApp({
         screen: {
            screen: 'agenda.DayContainer',
            title: 'Agenda'
         },
         appStyle: {
            orientation: 'portrait',
            navBarTitleTextCentered: true,
         },
         // passProps: {
         //    date: getToday()
         // }
      });
   }

  


   
}

export default startSingleScreenApp;