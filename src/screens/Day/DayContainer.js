import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import DayScreen from './Day';
import { getDateArray, getFormatedDate } from '../../helpers/dates';

export class DayContainer extends Component {

   state = {
      datesList: getDateArray(),
      dateToday: this.props.date,
      displayDate: getFormatedDate(this.props.date)
   }

   constructor(props) {
      super(props);
   }


   render() {
      return (
         <ScrollableTabView
            tabBarPosition='bottom'
            initialPage={180}
            prerenderingSiblingsNumber={5}
            //renderTabBar={() => <ScrollableTabBar style={{ backgroundColor: 'red' }} />}
         >
            {this.state.datesList.map((date) =>
               <View style={{ flex: 1 }}
                  tabLabel={getFormatedDate(date)} 
                  key={date.toString()}
               >
                  <DayScreen date={date} />
               </View>
            )}
         </ScrollableTabView>
      )
   }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DayContainer);
