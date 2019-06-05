import React, { Component } from 'react';
import { View, Switch, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { ADD_TASK_SAGA, EDIT_TASK_SAGA } from '../../store/actions/actionTypes';
import validate from '../../helpers/validation';
import Btn from '../../components/UI/ButtonWithBackground';
import Txt from '../../components/UI/MainText';
import Imp from '../../components/UI/DefaultInput';
import DatePicker from '../../components/DatePicker/DatePicker';


export class TaskFormScreen extends Component {

   constructor(props) {
      super(props);
   }

   state = {

      controls: {

         title: {
            value: this.props.editMode ? this.props.task.title : '',
            valid: this.props.editMode || false,
            validationRules: {
               notEmpty: true
            },
            touched: false
         },
         date: {
            value: this.props.date,
            valid: false,
            validationRules: {
            },
            touched: false
         },
         time: {
            value: this.props.editMode ? this.props.task.time : '',
            valid: false,
            validationRules: {
            },
            touched: false
         },
         important: {
            value: this.props.editMode ? this.props.task.important : false,
            valid: false,
            validationRules: {
            },
            touched: false
         },
         description: {
            value: this.props.editMode ? this.props.task.description : '',
            valid: false,
            validationRules: {
            },
            touched: false
         }

      }
   };

   updateInputState = (key, value) => {
      this.setState(prevState => {
         return {
            controls: {
               ...prevState.controls,
               [key]: {
                  ...prevState.controls[key],
                  value: value,
                  valid: validate(value, prevState.controls[key].validationRules),
                  touched: true
               }
            }
         };
      });
   };


   submit = () => {
     // let d = this.state.controls.date.value;

      let task = {
         id: this.props.editMode ? this.props.task.id : '',
         title: this.state.controls.title.value,
         date: this.state.controls.date.value,
         time: this.state.controls.time.value || '9.00',
         important: this.state.controls.important.value,
         description: this.state.controls.description.value
      };

      this.props.editMode ? this.props.onEditTask(task) : this.props.onAddTask(task);
      this.props.navigator.dismissModal({
         animationType: 'slide-down'
      });
   }

   render() {
      return (
         <View style={{ flex: 1, backgroundColor: 'white', width: '100%', height: '100%' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

               <View style={{ flex: 1, padding: 15 }}>
                  <View style={styles.inputContainer}>
                     <Txt>Title: </Txt>
                     <Imp
                        placeholder='Title' style={styles.input}
                        value={this.state.controls.title.value}
                        valid={this.state.controls.title.valid}
                        touched={this.state.controls.title.touched}
                        onChangeText={(val) => this.updateInputState('title', val)}
                     ></Imp>

                     <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 14 }}>
                        <Txt>Important: </Txt>
                        <Switch
                           onValueChange={(val) => this.updateInputState('important', val)}
                           value={this.state.controls.important.value} />
                     </View>

                     <Txt>Date: </Txt>
                     <DatePicker style={{ marginBottom: 14 }}
                        date={this.state.controls.date.value}
                        onDateChange={(val) => this.updateInputState('date', val)} />

                     <Txt>Time: </Txt>
                     <Imp
                        placeholder='Time' style={styles.input}
                        value={this.state.controls.time.value}
                        valid={this.state.controls.time.valid}
                        touched={this.state.controls.time.touched}
                        keyboardType='numeric'
                        onChangeText={(val) => this.updateInputState('time', val)}
                     ></Imp>

                     <Txt>Description: </Txt>
                     <Imp
                        placeholder='Title' style={styles.input}
                        value={this.state.controls.description.value}
                        valid={this.state.controls.description.valid}
                        touched={this.state.controls.description.touched}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(val) => this.updateInputState('description', val)}
                     ></Imp>
                  </View>


                  <View style={{ flex: 1 }}>
                     <Btn color='blue' 
                        disabled={ !this.state.controls.title.valid } 
                        onPress={this.submit}>Submit</Btn>
                  </View>

               </View>
            </TouchableWithoutFeedback>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   inputContainer: {
      flex: 5,
      justifyContent: 'center',
      paddingRight: 20,
      paddingLeft: 20
   },
   input: {
      backgroundColor: '#eee',
      marginBottom: 14
   },
   errorText: {
      color: 'white',
      paddingTop: 30
   }
});

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
   return {
      onAddTask: (task) => dispatch({
         type: ADD_TASK_SAGA,
         payload: task
      }),
      onEditTask: (task) => dispatch({
         type: EDIT_TASK_SAGA,
         payload: task
      })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskFormScreen)
