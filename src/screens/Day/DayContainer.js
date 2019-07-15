import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { GET_TASKS_SAGA, DO_SOMETHING, DELETE_TASK_SAGA, RESET_DATE, UI_STOP_LOADING } from '../../store/actions/actionTypes';
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
                     actions: ['Today', 'Go to Date...', 'Weekly View', 'Unplanned Tasks' ],
                     onPress: this.menuHandler
                  },
                  icon: sources
               }
            ]
        });        
     });
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.choosedDate !== null) {
         this.goToPage(daysBeforeToday() - this.date_diff_indays(nextProps.choosedDate));

         this.props.resetDate();
      }
   }

   date_diff_indays = (date1) => {
      dt1 = new Date(date1);
      dt2 = getToday();

      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
   }

   menuHandler = (a, b) => {
      if (b === 0) { // Today
         this.goToPage(daysBeforeToday());
      } 
      else if (b === 1) { // Go to Date...
         this.props.navigator.showModal({
            screen: 'agenda.ChooseDateScreen',
            title: 'Choose Date',
            animationType: 'fade',
            passProps: {date: this.state.dateToday},
         });
      }  
      else if (b === 2) { // Weekly View
         startSingleScreenApp('agenda.WeekScreen');
      }    
      else if (b === 3) { // Unplanned Tasks
       this.props.navigator.showModal({
         screen: 'agenda.UnplannedTasks',
         title: 'Unplanned Tasks',
         animationType: 'fade',
      });
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
         .filter(t => t.unplanned !== true)
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
            prerenderingSiblingsNumber={Infinity}
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
      isLoading: state.ui.isLoading,
      choosedDate: state.date.choosedDate
   };
};

const mapDispatchToProps = dispatch => {
   return {
      getTasks: () => dispatch({ type: GET_TASKS_SAGA }),
      onDeleteTask: (id) => dispatch({
         type: DELETE_TASK_SAGA,
         id: id
      }),
      resetDate: () => dispatch({ type: RESET_DATE }),
      doSomething: () => dispatch({ type: DO_SOMETHING })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayContainer);
