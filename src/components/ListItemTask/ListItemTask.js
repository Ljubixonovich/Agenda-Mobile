import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';

import Txt from '../../components/UI/MainText';

const ListItemTask = props => {
   const { task } = props;

   return (
      <View style={styles.mainContainer}>
         <View style={styles.topContainer}>
            <Txt style={{ fontWeight: 'bold' }}>{task.time} h</Txt>

            <Txt style={{ fontWeight: 'bold' }}>{task.title}</Txt>

            {task.important ?
               <View style={{ padding: 10 }}>
                  <Image style={styles.icon}
                     source={require('../../assets/star.png')}
                  />
               </View> : 
               <View style={{ padding: 10 }}>
                  <Image style={styles.icon} />
               </View>
            }

            {/* <Txt>ID: {task.id}</Txt> */}            
         </View>
         
         { task.description !== '' && 
               <Txt>{task.description}</Txt>
         }

         <View style={styles.bottomIconContainer}>
            <TouchableOpacity style={{ padding: 10 }}
               onPress={() => props.onEditTaskHandler(task)}>
               <Image style={[styles.icon, styles.editIcon]}
                  source={require('../../assets/edit.png')}
               />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }}
               onPress={() => { props.connfirmDeleteTask(task.id) }}>
               <Image style={styles.icon}
                  source={require('../../assets/delete.png')}
               />
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      alignItems: 'flex-start',      
      width: '100%',
      padding: 10,
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

export default ListItemTask;
