import React, { Component } from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-datepicker';

import { getValidDate } from '../../helpers/dates';
import Txt from '../UI/MainText';

export default class LjDatePicker extends Component {
   constructor(props) {
      super(props)
      this.state = { date: props.date }
   }

   changeDateHandler = (date) => {
      let d1 = getValidDate(date);
      this.setState({ date: date });
      this.props.onDateChange(d1);
   }

   render() {
      return (
         <DatePicker
            style={[this.props.style, { width: 200 }]}
            date={this.state.date}
            mode="date"
            defaultValue={null}
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2020-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
               dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
               },
               dateInput: {
                  marginLeft: 36
               }
               // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.changeDateHandler(date)} }
         />
      )
   }
}