import AsyncStorage from '@react-native-community/async-storage';

export const getLastId = async () => {
   try {
      let value = await AsyncStorage.getItem('@lastId');
      value = !value ? 0 : value;
      return value;
   } catch (e) {
      console.log('error with getLastId');
   }
}

export const addTask = async (task) => {
   try {
      let lastId = await getLastId();
      lastId = parseInt(lastId);
      task.id = (lastId + 1).toString();
      await AsyncStorage.setItem('@' + ((lastId + 1).toString()), JSON.stringify(task));
      await AsyncStorage.setItem('@lastId', (lastId + 1).toString());
      console.log('Task added.');
   } catch (e) {
      console.log('error with adding task');
   }
}

export const editTask = async (task) => {
   try {
      const value = await AsyncStorage.setItem(task.id, task);
      console.log('Task edited.');
   } catch (e) {
      console.log('error with editing task');
   }   
}

export const deleteTask = async (id) => {
   try {
      await AsyncStorage.removeItem(id);
      console.log('Task removed.');
   } catch (e) {
      console.log('error with removing task');
   }
   
}

export const getAllTasks = async () => {
   let keys, tasks = [];
   try {
      keys = await AsyncStorage.getAllKeys();
      for (const k of keys) {
         // get only tasks
         if (k !== '@lastId') {
            const task = await AsyncStorage.getItem(k);
            if (task !== null) {
               tasks.push(JSON.parse(task));
            }
         }
      }
      console.log('tasks.lenght: ' + tasks.lenght);
      return tasks;
   } catch (error) {
      console.log('error with getAllTasks');
   }
}