import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';


class WelcomeScreen extends Component {
    constructor(props) {
      super(props);
   } 


   render() {
      return (
         <View>
            <Text>Cao lj</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   
});

const mapStateToProps = state => {
   return {
      isLoading: state.ui.isLoading
   };
}


export default connect(mapStateToProps, null)(WelcomeScreen);
