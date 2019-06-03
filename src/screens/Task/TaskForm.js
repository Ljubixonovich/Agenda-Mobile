import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { ADD_TASK_SAGA, EDIT_TASK_SAGA } from '../../store/actions/actionTypes';

import Btn from '../../components/UI/ButtonWithBackground'

export class TaskFormScreen extends Component {

   constructor(props) {
      super(props);
   }

   submit = () => {
      let task = {
         id: '',
         title: 'Stan task',
         date: new Date(2019, 5, 3),
         time: '9.35',
         important: true,
         description: 'lorem ... '
      };
      this.props.onAddTask(task);

      this.props.navigator.dismissModal({
         animationType: 'slide-down'
       });
   }

   render() {
      return (
         <View style={{flex: 1, backgroundColor: 'white'}}>
            <Text> TaskFormScreen </Text>
            <Btn onPress={this.submit}>Submit</Btn>
         </View>
      )
   }
}

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
