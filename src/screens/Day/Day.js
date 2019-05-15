import React, { Component } from 'react';
import { View, Text, Button, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { getFormatedDate } from '../../helpers/dates';
import { mockTasks } from '../../helpers/mockTasks';

export class DayScreen extends Component {

   state = {
      date: this.props.date,
      displayDate: getFormatedDate(this.props.date)
   }

   constructor(props) {
      super(props);
    //  console.log('constructor ' + JSON.stringify(props));
   }

   nextDayHandler = () => {
      const currentDate = this.props.date;
      let nextDay = new Date(currentDate.getTime() + 86400000);
      this.props.navigator.resetTo({
         screen: 'agenda.DayScreen',
         title: 'Agenda',
         animated: true,
         animationType: 'slide-horizontal',
         passProps: {
            date: nextDay
         }
      });
   }

   previousDayHandler = () => {
      const currentDate = this.props.date;
      let previousDay = new Date(currentDate.getTime() - 86400000);
      this.props.navigator.resetTo({
         screen: 'agenda.DayScreen',
         title: 'Agenda',
         animated: true,
         animationType: 'fade',
         passProps: {
            date: previousDay
         }
      });
   }


   render() {
      let tasks = mockTasks.filter(t => t.date == this.props.date);
      console.log('mock task date: ' + mockTasks[4].date);
      console.log('this.props.date: ' + this.props.date);
      return (
         <View style={{flex: 1}}>
            <View style={{flex: 1}}>
               <Text> Day: {this.state.displayDate} </Text>
               <Button title='Next Day' onPress={this.nextDayHandler}></Button>
               <Button title='Previous Day' onPress={this.previousDayHandler}></Button>
            </View>
            <View style={{flex: 2}}>
               <FlatList 
                  data={tasks}
                //  data={mockTasks}
                  keyExtractor={(task) => task.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={(task) => {
                     return (
                        <View style={{flex: 1}}>
                           <Text>{getFormatedDate(task.item.date)}</Text>
                           <Text>{task.item.id}</Text>
                           <Text>{task.item.important ? 'Important' : 'Not important'}</Text>
                           <Text>Title: {task.item.title}</Text>
                           <Text>Time: {task.item.time}</Text>
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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DayScreen);
