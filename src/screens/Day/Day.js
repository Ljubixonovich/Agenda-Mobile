import React, { Component } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { getFormatedDate, getFormatedDate2, compareDates, getToday } from '../../helpers/dates';
import { mockTasks } from '../../helpers/mockTasks';
import { ADD_TASK_SAGA, GET_TASKS_SAGA, DO_SOMETHING } from '../../store/actions/actionTypes';

export class DayScreen extends Component {

   state = {
      date: this.props.date,
      displayDate: getFormatedDate2(this.props.date)
   }

   constructor(props) {
      super(props);
   }

   componentDidMount() {
      this.props.getTasks();
   }
 
   onAddTaskHandler = () => {
      let task = {
         id: 'id12',
         title: 'Probni task 2',
         date: new Date(2019, 4, 28),
         time: '9.45',
         important: false,
         description: ''
      };
      this.props.onAddTask(task);
   }


   render() {
      if (this.props.isLoading) {
         return (
            <View style={{flex: 1}}>
               <ActivityIndicator size="large" color="#0000ff" />
            </View>
         );
      } 
      
      let tasks = this.props.tasks.filter(t => compareDates(t.date, this.props.date));
      console.log(tasks);     
      // let tasks = mockTasks.filter(t => compareDates(t.date, this.props.date));

      tasks = tasks.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
      return (
         <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
               <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>{this.state.displayDate} </Text>
                           
               <Button title='add task' onPress={this.onAddTaskHandler} />
            </View>
            <View style={{ flex: 2 }}>
               <FlatList
                  data={tasks}
                  keyExtractor={(task) => task.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={(task) => {
                     return (
                        <View style={{ flex: 1 }}>
                           <Text>{getFormatedDate(task.item.date)}</Text>
                           <Text>{task.item.id}</Text>
                           <Text>{task.item.important ? 'Important' : 'Not important'}</Text>
                           <Text>Title: {task.item.title}</Text>
                           <Text>Time: {task.item.time}</Text>
                           <Text>Desc: {task.item.description}</Text>
                           <Text>----------------------</Text>
                        </View>
                     );
                  }}
               />
            </View>
         </View>
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
      getTasks: () => dispatch({type: GET_TASKS_SAGA}),
      onAddTask: (task) => dispatch({
         type: ADD_TASK_SAGA,
         payload: task
      }),
      doSomething: () => dispatch({type: DO_SOMETHING})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayScreen);
