import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';

import { SET_DATE, UI_START_LOADING } from '../../store/actions/actionTypes';

export class ChooseDateScreen extends Component {
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      this.datepicker.onPressDate();
   }

   updateDate = (val) => {
      this.props.setDate(val);

      this.props.navigator.dismissModal({
         animationType: 'slide-down',
      });
   }


   render() {
      return (
         <View style={styles.mainContainer}>
            <DatePicker
               ref={(datepicker) => this.datepicker = datepicker}
               date={this.props.date}
               style={[this.props.style, { width: 200 }]}
               mode="date"
               defaultValue={null}
               placeholder="select date"
               format="YYYY-MM-DD"
               minDate="2016-05-01"
               maxDate="2022-06-01"
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
               }}
               onDateChange={(val) => this.updateDate(val)}
            />
            <ActivityIndicator size="large" color="#0000ff"/>
         </View>





      )
   }
}

const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      padding: 12,
      paddingBottom: 6
   },
});

const mapStateToProps = state => {
   return {
     // isLoading: state.ui.isLoading
   };
}

const mapDispatchToProps = dispatch => {
   return {
      setDate: (date) => dispatch({
         // type: SET_DATE_SAGA,
         type: SET_DATE,
         date: date
      }),
      startLoading: () => dispatch({ type: UI_START_LOADING })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDateScreen);
