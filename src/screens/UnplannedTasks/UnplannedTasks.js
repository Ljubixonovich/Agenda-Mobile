import React, { Component } from 'react';
import { View, Alert, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import startSingleScreenApp from '../../startSingleScreenApp';
import { GET_TASKS_SAGA, DELETE_TASK_SAGA } from '../../store/actions/actionTypes';
import { getToday } from '../../helpers/dates';
import Txt from '../../components/UI/MainText';
import ListItemTask from '../../components/ListItemTask/ListItemTask';

export class UnplannedTasks extends Component {
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
                     actions: ['New Task'],
                     onPress: this.menuHandler
                  },
                  icon: sources
               }
            ]
         });
      });
   }

   menuHandler = (a, b) => {
      if (b === 0) {
         this.onAddTaskHandler();
      }
      else if (b === 1) {
       //  startSingleScreenApp('agenda.WeekScreen');
      }
   };

   onAddTaskHandler = () => {
      this.props.navigator.showModal({
         screen: 'agenda.TaskFormScreen',
         title: 'Add Task',
         animationType: 'fade',
         passProps: { editMode: false, date: getToday(), sendFrom: 'UnplannedTasks' },
      });
   }

   onEditTaskHandler = (task) => {
      console.log(task);
      
      this.props.navigator.showModal({
         screen: 'agenda.TaskFormScreen',
         title: 'Edit Task',
         animationType: 'fade',
         passProps: {editMode: true, task: task, date: this.props.date, sendFrom: 'UnplannedTasks'},
      });
   }

   connfirmDeleteTask = (id) => {
      Alert.alert('', 'Delete task ?', [
         {text: 'no'},
         {text: 'yes', onPress: () => this.props.onDeleteTask(id)}
        
      ]);
   }

   filterTasks = () => {
      const { tasks } = this.props;
      let filteredTasks = [];
      if (tasks && tasks.length > 0) {
         filteredTasks = tasks
            .filter(t => t.unplanned === true)
            .sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
      }

      return filteredTasks;
   }


   render() {
      const filteredTasks = this.filterTasks();
      
      return (
         <View style={{ flex: 1, backgroundColor: 'white'}}>
            {filteredTasks.length > 0 &&
               <FlatList
                  data={filteredTasks}
                  keyExtractor={(filteredTasks) => filteredTasks.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={(t) => {
                     let task = t.item;
                     return (  
                        <ListItemTask 
                           task={task}
                           onEditTaskHandler={this.onEditTaskHandler}
                           connfirmDeleteTask={this.connfirmDeleteTask}
                        />
                     );
                  }}
               />
            }
         </View>
      )
   }
}

const styles = StyleSheet.create({
   headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#bbb', 
   },
   icon: {
      height: 20,
      width: 20
   },
})

const mapStateToProps = (state) => {
   return {
      tasks: state.tasks.tasks
   };
};

const mapDispatchToProps = dispatch => {
   return {
      getTasks: () => dispatch({ type: GET_TASKS_SAGA }),
      onDeleteTask: (id) => dispatch({
         type: DELETE_TASK_SAGA,
         id: id
      }),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnplannedTasks);
