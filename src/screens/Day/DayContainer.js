import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { GET_TASKS_SAGA, DO_SOMETHING, DELETE_TASK_SAGA } from '../../store/actions/actionTypes';
import DayScreen from './Day';
import DatePicker from '../../components/DatePicker/DatePicker';
import startSingleScreenApp from '../../startSingleScreenApp';
import { getFormatedDate, getSerbianDate, getDateArray, compareDates, getToday } from '../../helpers/dates';
import { daysBeforeToday } from '../../helpers/constants';

export class DayContainer extends Component {

   state = {
      datesList: getDateArray(),
      dateToday: getToday(),
      displayDate: getFormatedDate(getToday())
   }

   constructor(props) {
      super(props);
   }

   componentDidMount() {
      this.props.getTasks();

      Icon.getImageSource('md-more', 30).then((sources) => {
         this.props.navigator.setButtons({
            rightButtons: [
               { 
                  id: 'menu', 
                  component: 'agenda.PopupMenu', 
                  passProps: {
                     actions: ['Today', 'Go to Date...', 'Weekly View'],
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
         this.goToPage(daysBeforeToday());
        // alert('Today');
      } else if (b === 1) { // Go to Date...
         alert('Go to Date...');
      }  
      else if (b === 2) { // Weekly View
         startSingleScreenApp('agenda.WeekScreen');
         // alert('Weekly View');
      }    
   };

   goToPage = (pageId) =>{
      this.tabView.goToPage(pageId);
   }

   filterTasks = (date) => {
      const { tasks } = this.props;
      let filteredTasks = [];
      if (tasks && tasks.length > 0) {
      }
      filteredTasks = tasks
         .filter(t => compareDates(t.date, date))
         .sort((a, b) => parseFloat(a.time) - parseFloat(b.time));

      return filteredTasks;
   }

   render() {
      if (this.props.isLoading) {
         return (
            <View style={{ flex: 1 }}>
               <ActivityIndicator size="large" color="#0000ff" />
            </View>
         );
      }

      return (
         <ScrollableTabView
            ref={(tabView) => { this.tabView = tabView}}
            tabBarPosition='overlayBottom'
            tabBarTextStyle={{fontSize: 30, color: 'transparent'}}
            initialPage={daysBeforeToday()}
            prerenderingSiblingsNumber={5}
            tabBarUnderlineStyle={{ backgroundColor:'#ff0000', height:0, }}
            renderTabBar={() => 
               <ScrollableTabBar style={{backgroundColor: 'transparent' }} />}
         >
            {this.state.datesList.map((date) =>
               <View style={{ flex: 1 }}
                  tabLabel={getSerbianDate(date) + ' 2019.'}
                  key={date.toString()}
               >
                  <DayScreen 
                     date={date} 
                     tasks={this.filterTasks(date)} 
                     onDeleteTask={this.props.onDeleteTask}
                     navigator={this.props.navigator}
                  />
               </View>
            )}
         </ScrollableTabView>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      tasks: state.tasks.tasks,
      isLoading: state.ui.isLoading
   };
};

const mapDispatchToProps = dispatch => {
   return {
      getTasks: () => dispatch({ type: GET_TASKS_SAGA }),
      onDeleteTask: (id) => dispatch({
         type: DELETE_TASK_SAGA,
         id: id
      }),
      doSomething: () => dispatch({ type: DO_SOMETHING })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayContainer);
