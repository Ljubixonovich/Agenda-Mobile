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
         unplanned: {            
            value: this.props.editMode ? this.props.task.unplanned : this.props.sendFrom === 'UnplannedTasks' ? true : false,
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
         unplanned: this.state.controls.unplanned.value,
         description: this.state.controls.description.value
      };

      this.props.editMode ? 
         this.props.onEditTask(task) : 
         this.props.onAddTask(task);

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
                  <View style={{alignItems: 'center', marginBottom: 14}}>
                     <DatePicker
                        date={this.state.controls.date.value}
                        onDateChange={(val) => this.updateInputState('date', val)}
                     />
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                     <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Txt>Important: </Txt>
                        <Switch
                           onValueChange={(val) => this.updateInputState('important', val)}
                           value={this.state.controls.important.value}
                        />
                     </View>

                     <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Txt>Unplanned: </Txt>
                        <Switch
                           onValueChange={(val) => this.updateInputState('unplanned', val)}
                           value={this.state.controls.unplanned.value}
                        />
                     </View>
                  </View>


                  <Imp
                     placeholder='Title' style={styles.input}
                     value={this.state.controls.title.value}
                     valid={this.state.controls.title.valid}
                     touched={this.state.controls.title.touched}
                     onChangeText={(val) => this.updateInputState('title', val)}
                  ></Imp>

                  <Imp
                     placeholder='Time' style={styles.input}
                     value={this.state.controls.time.value}
                     valid={this.state.controls.time.valid}
                     touched={this.state.controls.time.touched}
                     keyboardType='numeric'
                     onChangeText={(val) => this.updateInputState('time', val)}
                  ></Imp>

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
                     <View >
                        <Btn color='#092ee8' width={90} textColor='white'
                           disabled={!this.state.controls.title.valid}
                           onPress={this.submit}
                        >Save</Btn>
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
      padding: 12,
     paddingBottom: 6
   },
   inputContainer: {
      flex: 1,
     // justifyContent: 'center',
     justifyContent: 'flex-end',
      paddingRight: 20,
      paddingLeft: 20
   },
   bottomContainer: {
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center',
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
         task: task
      }),
      onEditTask: (task) => dispatch({
         type: EDIT_TASK_SAGA,
         task: task
      })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskFormScreen)
