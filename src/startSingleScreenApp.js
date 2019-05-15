import { Navigation } from 'react-native-navigation';

// import today from './helpers/dates';

let today = new Date();
today.setHours(0, 0, 0, 0);

const startSingleScreenApp = () => {
   Navigation.startSingleScreenApp({
      screen: {
         screen: 'agenda.DayScreen',
         title: 'Agenda'
      },
      appStyle: {
         orientation: 'portrait'
      },
      passProps: {
         // date: new Date()
         date: today
      }
   });
}

export default startSingleScreenApp;