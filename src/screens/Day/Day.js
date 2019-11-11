import React from 'react';
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { getSerbianDate } from '../../helpers/dates';
import Txt from '../../components/UI/MainText';
import ListItemTask from '../../components/ListItemTask/ListItemTask';

export const DayScreen = (props) => {

   const { tasks, date } = props;

   onAddTaskHandler = () => {
      props.navigator.showModal({
         screen: 'agenda.TaskFormScreen',
         title: 'Add Task',
         animationType: 'fade',
         passProps: { editMode: false, date: date, sendFrom: 'DayScreen' },
      });
   }

   onEditTaskHandler = (task) => {
      props.navigator.showModal({
         screen: 'agenda.TaskFormScreen',
         title: 'Edit Task',
         animationType: 'fade',
         passProps: { editMode: true, task: task, date: date, sendFrom: 'DayScreen' },
      });
   }

   connfirmDeleteTask = (id) => {
      Alert.alert('', 'Delete task ?', [
         { text: 'no' },
         { text: 'yes', onPress: () => props.onDeleteTask(id) }

      ]);
   }



   return (
      <View style={{ flex: 1, marginBottom: 20 }}>
         <View style={styles.headerContainer}>
            <View>
               <Image style={styles.icon} />
            </View>
            <Txt style={styles.mainTitle}>
               {getSerbianDate(date)}
            </Txt>
            <TouchableOpacity style={{ padding: 14 }} onPress={onAddTaskHandler}>
               <Icon name="md-add" size={30} color="#0AD217" />
            </TouchableOpacity>
         </View>
         <View style={{ flex: 5 }}>
            {tasks.length > 0 &&
               <FlatList
                  data={tasks}
                  keyExtractor={(task) => task.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={(t) => {
                     let taskItem = t.item;
                     return (
                        <ListItemTask
                           task={taskItem}
                           onEditTaskHandler={onEditTaskHandler}
                           connfirmDeleteTask={connfirmDeleteTask}
                        />
                     );
                  }}
               />
            }
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#bbb',
   },
   mainTitle: {
      fontSize: 20,
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
