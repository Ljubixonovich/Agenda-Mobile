import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import startSingleScreenApp from '../../startSingleScreenApp';

export class WeekScreen extends Component {
   componentDidMount() {
      // this.props.getTasks();

      Icon.getImageSource('md-more', 30).then((sources) => {
         this.props.navigator.setButtons({
            rightButtons: [
               { 
                  id: 'menu', 
                  component: 'agenda.PopupMenu', 
                  passProps: {
                     actions: ['Today', 'Go to Date...', 'Daily View'],
                     onPress: this.menuHandler
                  },
                  icon: sources
               }
            ]
        });        
     });
   }

   menuHandler = (a, b) => {
      if (b === 0) { // Today
        alert('Today');
      } else if (b === 1) { // Go to Date...
         alert('Go to Date...');
      }  
      else if (b === 2) { // Daily View
         startSingleScreenApp('agenda.DayContainer');
         // alert('Daily View');
      }    
   };


   render() {
      return (
         <View>
            <Text> Week </Text>
         </View>
      )
   }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(WeekScreen);
