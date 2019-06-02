import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';

import { getSerbianDate } from '../../helpers/dates';
import Btn from '../../components/UI/ButtonWithBackground';

export class DayScreen extends Component {


   constructor(props) {
      super(props);
   }


   onAddTaskHandler = () => {
      this.props.navigator.showModal({
         screen: 'agenda.TaskModalScreen',
         title: 'Add Task',
         animationType: 'fade'
         });
   }

   connfirmDeleteTask = (id) => {
      Alert.alert('', 'Delete task ?', [
         {text: 'yes', onPress: () => this.props.onDeleteTask(id)},
         {text: 'no'}
      ]);
   }


   render() {
      const { tasks, date } = this.props;

      return (
         <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>

               <Text style={{ width: 50 }}></Text>
               <Text style={styles.mainTitle}>
                  {getSerbianDate(date)}
               </Text>
               <Btn width={50} onPress={this.onAddTaskHandler}>
                  +
               </Btn>

            </View>
            <View style={{ flex: 5 }}>
               {tasks.length > 0 ?
                  <FlatList
                     data={tasks}
                     keyExtractor={(task) => task.id}
                     showsVerticalScrollIndicator={false}
                     renderItem={(task) => {
                        let id = task.item.id;
                        return (                           
                           <View style={styles.taskContainer}>
                              <Text>{id}</Text>
                              <Text>{task.item.important ? 'Important' : 'Not important'}</Text>
                              <Text>Title: {task.item.title}</Text>
                              <Text>Time: {task.item.time}</Text>
                              <Text>Desc: {task.item.description}</Text>
                              <Btn width={50} onPress={() => { this.connfirmDeleteTask(id) }}>X</Btn>
                           </View>
                        );
                     }}
                  />
                  : null
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
      textAlign: 'center',
      color: 'black',
   },
   taskContainer: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
      padding: 10,
      margin: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#bbb',
   }
})


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DayScreen);
