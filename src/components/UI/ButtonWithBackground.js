import React from 'react';
import {
   TouchableOpacity,
   TouchableNativeFeedback,
   Text,
   View,
   StyleSheet,
   Platform
} from 'react-native';

const buttonWithBackground = props => {
   const content = (
      <View style={[
         styles.button,
         { backgroundColor: props.color,
            width: props.width 
         },
         props.disabled ? styles.disabled : null
      ]}>
         <Text style={[
            { textAlign: 'center', fontSize: 20, color: props.textColor },
            props.disabled ? styles.disabledText : null]}
         >
            {props.children}
         </Text>
      </View>
   );

   if (props.disabled) {
      return content;
   }
   if (Platform.OS === 'android') {
      return (
         <TouchableNativeFeedback onPress={props.onPress}>
            {content}
         </TouchableNativeFeedback>
      );
   }

   return (
      <TouchableOpacity onPress={props.onPress}>
         {content}
      </TouchableOpacity>
   );

};

const styles = StyleSheet.create({
   button: {
      padding: 5,
      margin: 5,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
   },
   disabled: {
      backgroundColor: '#eee',
      borderColor: '#aaa'
   },
   disabledText: {
      color: '#aaa',
   }
});

export default buttonWithBackground;