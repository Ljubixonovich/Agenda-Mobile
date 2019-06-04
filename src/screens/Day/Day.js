import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { getSerbianDate } from '../../helpers/dates';
import Txt from '../../components/UI/MainText';

export class DayScreen extends Component {
   
   constructor(props) {
      super(props);
   }


   onAddTaskHandler = () => {
      this.props.navigator.showModal({
         screen: 'agenda.TaskFormScreen',
         title: 'Add Task',
         animationType: 'fade',
         passProps: {editMode: false},
         });
   }

   onEditTaskHandler = (task) => {
      console.log(task);
      
      this.props.navigator.showModal({
         screen: 'agenda.TaskFormScreen',
         title: 'Edit Task',
         animationType: 'fade',
         passProps: {editMode: true, task: task},
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
                           <View style={styles.taskContainer}>
                              <View style={{flex: 3}}>
                                 <Txt>{task.id}</Txt>
                                 <Txt>
                                    {task.important ? 'Important' : 'Not important'}
                                 </Txt>
                                 {task.important && 
                                    <View  style={{padding: 10}}>
                                       <Image  style={styles.icon} 
                                          source={require('../../assets/star.png')} 
                                       />
                                    </View>
                                 }
                                 <Txt>Title: {task.title}</Txt>
                                 <Txt style={{color: 'red'}}>Time: {task.time} h</Txt>
                                 <Txt>Desc: {task.description}</Txt>
                              </View>

                              <View style={styles.bottomIconContainer}> 
                                 <TouchableOpacity style={{padding: 10}}
                                    onPress={() => this.onEditTaskHandler(task)}>
                                    <Image  style={[styles.icon, styles.editIcon]}
                                       source={require('../../assets/edit.png')} 
                                    />
                                 </TouchableOpacity>
                                 <TouchableOpacity  style={{padding: 10}}
                                    onPress={() => { this.connfirmDeleteTask(task.id) }}>
                                    <Image style={styles.icon} 
                                       source={require('../../assets/delete.png')}                                        
                                    />
                                 </TouchableOpacity>                                    
                              </View>                      
                           </View>
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
   },
   bottomIconContainer: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
   },
   icon: {     
      height: 20, 
      width: 20
   },
   editIcon: {
      transform: [{ rotate: '90deg' }]
   }
})


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DayScreen);
