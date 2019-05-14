import { Navigation } from 'react-native-navigation';

const startSingleScreenApp = () => {
   Navigation.startSingleScreenApp({
      screen: {
         screen: "agenda.WelcomeScreen",
         title: "Welcome"
      },
      appStyle: {
         orientation: 'portrait'
      },
   });
}

export default startSingleScreenApp;