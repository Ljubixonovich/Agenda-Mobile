import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getSerbianDate } from '../../helpers/dates';

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
         title: 'Juni task',
         date: new Date(2019, 5, 1),
         time: '9.15',
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
      
      return (
         <View style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingTop: 10 }}>
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
               }
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
