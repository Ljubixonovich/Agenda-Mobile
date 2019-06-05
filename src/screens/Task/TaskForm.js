import React, { Component } from 'react';
import { View, Switch, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
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
         <KeyboardAvoidingView
            style={styles.mainContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <View style={styles.inputContainer}>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 14 }}>
                     <Txt>Important: </Txt>
                     <Switch
                        onValueChange={(val) => this.updateInputState('important', val)}
                        value={this.state.controls.important.value}
                     />
                  </View>


                  <Txt>Title: </Txt>
                  <Imp
                     placeholder='Title' style={styles.input}
                     value={this.state.controls.title.value}
                     valid={this.state.controls.title.valid}
                     touched={this.state.controls.title.touched}
                     onChangeText={(val) => this.updateInputState('title', val)}
                  ></Imp>

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
                     placeholder='Description' style={styles.input}
                     value={this.state.controls.description.value}
                     valid={this.state.controls.description.valid}
                     touched={this.state.controls.description.touched}
                     multiline={true}
                     numberOfLines={4}
                     onChangeText={(val) => this.updateInputState('description', val)}
                  ></Imp>

                  <View style={styles.bottomContainer}>
                     <Txt>Date: </Txt>
                     <DatePicker
                        date={this.state.controls.date.value}
                        onDateChange={(val) => this.updateInputState('date', val)}
                     />

                     <View >
                        <Btn color='#092ee8' width={90} textColor='white'
                           disabled={!this.state.controls.title.valid}
                           onPress={this.submit}
                        >Submit</Btn>
                     </View>
                  </View>

               </View>
            </TouchableWithoutFeedback>
         </KeyboardAvoidingView>
      )
   }
}

const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      padding: 15,
   },
   inputContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingRight: 20,
      paddingLeft: 20
   },
   bottomContainer: {
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-evenly',
   },   
   input: {
      backgroundColor: '#eee',
      marginBottom: 16
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
