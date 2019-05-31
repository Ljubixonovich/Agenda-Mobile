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

    
   onAddTaskHandler = () => {
      let task = {
         id: '',
         title: 'Probni task 2',
         date: new Date(2019, 4, 30),
         time: '9.25',
         important: false,
         description: ''
      };
      this.props.onAddTask(task);
   }

   lj = () => {
      this.props.getLastId();
   }


   render() {     
      const { tasks } = this.props;
      if (tasks.length > 0) {
         console.log('1: ' + tasks[0]);
         console.log('2:' + tasks[0]['title']);
         console.log('2b:' + tasks[0].title);
      }
      
      return (
         <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
               <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>
                  {this.state.displayDate} 
               </Text>                           
               <Button title='add task' onPress={this.onAddTaskHandler} />
               <Button title='get last ID' onPress={this.lj} />
            </View>
            <View style={{ flex: 2 }}>
               {tasks.length > 0 ? 
                  <FlatList
                     data={tasks}
                     keyExtractor={(task) => task.id}
                     showsVerticalScrollIndicator={false}
                     renderItem={(task) => {
                        return (
                           <View style={{ flex: 1 }}>
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
                   : null

                  // <Text> ima {tasks.length}</Text>
                  // : <Text>nema</Text>                

               }

            </View>
         </View>
      )
   }
}

// const mapStateToProps = (state) => {
//    return {
//       tasks: state.tasks.tasks,
//       isLoading: state.ui.isLoading
//    };
// };

// const mapDispatchToProps = dispatch => {
//    return {
//       getTasks: () => dispatch({type: GET_TASKS_SAGA}),
//       onAddTask: (task) => dispatch({
//          type: ADD_TASK_SAGA,
//          payload: task
//       }),
//       doSomething: () => dispatch({type: DO_SOMETHING})
//    }
// }


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DayScreen);
