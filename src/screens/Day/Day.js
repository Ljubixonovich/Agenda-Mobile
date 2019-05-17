import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getFormatedDate, compareDates, getDates, getDateArray } from '../../helpers/dates';
import { mockTasks } from '../../helpers/mockTasks';

export class DayScreen extends Component {

   state = {
      date: this.props.date,
      displayDate: getFormatedDate(this.props.date)
   }

   constructor(props) {
      super(props);
   }


   lj = () => {    
    let niz = getDateArray();
    console.log(niz);
   }   


   render() {
      let tasks = mockTasks.filter(t => compareDates(t.date, this.props.date));
      return (
         <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
               <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}> Day: {this.state.displayDate} </Text>
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
