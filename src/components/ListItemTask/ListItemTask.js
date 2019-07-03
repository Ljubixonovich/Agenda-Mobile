import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Txt from '../../components/UI/MainText';

const ListItemTask = props => {
   const { task, active } = props;

   return (
      <View style={styles.mainContainer}>
         <View style={styles.topContainer}>
            <Txt style={{ fontWeight: 'bold' }}>{task.time} h</Txt>

            <Txt style={{ fontWeight: 'bold' }}>{task.title}</Txt>

            {task.important ?
               <View style={{ padding: 10 }}>
                  {/* <Image style={styles.icon}
                     source={require('../../assets/star.png')}
                  /> */}
                  <Icon name="md-star" size={30} color="gold" />
               </View> 
               : 
               <View style={{ padding: 10 }}>
                  <Image style={styles.icon} />
               </View>
            }           
         </View>

         <View style={styles.bottomContainer}>
            <View style={{flex: 4}}>
               <Txt>{task.description}</Txt>
            </View>
            

            <View style={styles.iconContainer}>
               <TouchableOpacity style={{ padding: 10 }}
                  onPress={() => props.onEditTaskHandler(task)}>
                  {/* <Image style={[styles.icon, styles.editIcon]}
                     source={require('../../assets/edit.png')}
                  /> */}
                  <Icon name="md-create" size={30} color="#0738F4" />
               </TouchableOpacity>
               <TouchableOpacity style={{ padding: 10 }}
                  onPress={() => { props.connfirmDeleteTask(task.id) }}>
                  {/* <Image style={styles.icon}
                     source={require('../../assets/delete.png')}
                  /> */}
                  <Icon name="md-close" size={30} color="#FF0000" />
               </TouchableOpacity>
            </View>
            
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      alignItems: 'flex-start',      
      width: '100%',
      paddingLeft: 10,
      paddingRight: 10,
      margin: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#bbb',
   },
   topContainer: {
      width: '100%',
      flexDirection: 'row',     
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   bottomContainer: {
      width: '100%',
      flexDirection: 'row',     
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   iconContainer: {
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

export default ListItemTask;
