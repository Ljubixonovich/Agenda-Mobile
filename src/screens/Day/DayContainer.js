import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { ADD_TASK_SAGA, GET_TASKS_SAGA, DO_SOMETHING, DELETE_TASK_SAGA } from '../../store/actions/actionTypes';
import DayScreen from './Day';
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
            tabBarPosition='overlayBottom'
            tabBarTextStyle={{fontSize: 30, color: 'transparent'}}
            initialPage={daysBeforeToday()}
            prerenderingSiblingsNumber={5}
            tabBarUnderlineStyle=
               {{ backgroundColor:'#ff0000', height:0, }}
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
                     onAddTask={this.props.onAddTask} 
                     onDeleteTask={this.props.onDeleteTask}
                     getLastId={this.props.doSomething}
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
      onAddTask: (task) => dispatch({
         type: ADD_TASK_SAGA,
         payload: task
      }),
      onDeleteTask: (id) => dispatch({
         type: DELETE_TASK_SAGA,
         payload: id
      }),
      doSomething: () => dispatch({ type: DO_SOMETHING })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayContainer);
