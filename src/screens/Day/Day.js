import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';

import { getSerbianDate } from '../../helpers/dates';
import Btn from '../../components/UI/ButtonWithBackground';

export class DayScreen extends Component {

   state = {
      date: this.props.date,
      displayDate: getSerbianDate(this.props.date)
   }

   constructor(props) {
      super(props);
   }


   onAddTaskHandler = () => {
      let task = {
         id: '',
         title: 'Stan task',
         date: new Date(2019, 5, 1),
         time: '9.05',
         important: false,
         description: ''
      };
      this.props.onAddTask(task);
   }

   lj = () => {
      this.props.getLastId();
   }

   connfirmDeleteTask = (id) => {
      Alert.alert('', 'Delete task ?', [
         {text: 'yes', onPress: () => this.props.onDeleteTask(id)},
         {text: 'no'},
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
                           <View style={{ flex: 1 }}>
                              <Text>{id}</Text>
                              <Text>{task.item.important ? 'Important' : 'Not important'}</Text>
                              <Text>Title: {task.item.title}</Text>
                              <Text>Time: {task.item.time}</Text>
                              <Text>Desc: {task.item.description}</Text>
                              <Btn width={50} onPress={() => { this.connfirmDeleteTask(id) }}>X</Btn>
                              <Text>----------------------</Text>
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
   }
})


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DayScreen);
