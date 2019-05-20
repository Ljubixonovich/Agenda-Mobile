import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getFormatedDate, getFormatedDate2, compareDates, getToday } from '../../helpers/dates';
import { mockTasks } from '../../helpers/mockTasks';

export class DayScreen extends Component {

   state = {
      date: this.props.date,
      displayDate: getFormatedDate2(this.props.date)
   }

   constructor(props) {
      super(props);
   }
 


   render() {
      let tasks = mockTasks.filter(t => compareDates(t.date, this.props.date));
      tasks = tasks.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
      return (
         <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
               <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>{this.state.displayDate} </Text>
                           

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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DayScreen);
