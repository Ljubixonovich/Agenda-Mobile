import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { getSerbianDate } from '../../helpers/dates';
import Txt from '../../components/UI/MainText';
import ListItemTask from '../../components/ListItemTask/ListItemTask';

export class DayScreen extends Component {
   
   constructor(props) {
      super(props);
   }


   onAddTaskHandler = () => {
      this.props.navigator.showModal({
         screen: 'agenda.TaskFormScreen',
         title: 'Add Task',
         animationType: 'fade',
         passProps: {editMode: false, date: this.props.date},
         });
   }

   onEditTaskHandler = (task) => {
      console.log(task);
      
      this.props.navigator.showModal({
         screen: 'agenda.TaskFormScreen',
         title: 'Edit Task',
         animationType: 'fade',
         passProps: {editMode: true, task: task, date: this.props.date},
      });
   }

   connfirmDeleteTask = (id) => {
      Alert.alert('', 'Delete task ?', [
         {text: 'no'},
         {text: 'yes', onPress: () => this.props.onDeleteTask(id)}
        
      ]);
   }


   render() {
      const { tasks, date } = this.props;

      return (
         <View style={{ flex: 1, marginBottom: 20 }}>
            <View style={styles.headerContainer}>
               <View>
                  <Image style={styles.icon}/>
               </View>
               <Txt style={styles.mainTitle}>
                  {getSerbianDate(date)}
               </Txt>
               <TouchableOpacity  style={{padding: 14}} onPress={this.onAddTaskHandler}>
                  <Image source={require('../../assets/new.png')} 
                     style={styles.icon} 
                  />
               </TouchableOpacity>
            </View>
            <View style={{ flex: 5 }}>
               {tasks.length > 0 &&
                  <FlatList
                     data={tasks}
                     keyExtractor={(task) => task.id}
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
         </View>
      )
   }
}

const styles = StyleSheet.create({
   headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   mainTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
   },
   icon: {     
      height: 20, 
      width: 20
   },
})


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DayScreen);
