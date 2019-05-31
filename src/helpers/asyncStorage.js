import AsyncStorage from '@react-native-community/async-storage';

export const getLastId = async () => {
   try {
      let value = await AsyncStorage.getItem('@lastId');
      value = !value ? 0 : value;
      return value;
   } catch (e) {
   }
}

export const addTask = async (task) => {
   try {
      let lastId = await getLastId();
      lastId = parseInt(lastId);
      console.log(1);
      // let task = t;
      task.id = (lastId + 1).toString();
      await AsyncStorage.setItem('@' + ((lastId + 1).toString()), JSON.stringify(task));
      console.log(2);
      await AsyncStorage.setItem('@lastId', (lastId + 1).toString());
      console.log(3);
      console.log('sacuvan lastID');
      console.log('Task added.');
   } catch (e) {
   }
}

export const editTask = async (task) => {
   try {
      const value = await AsyncStorage.setItem(task.id, task);
   } catch (e) {
   }
   console.log('Task edited.');
}

export const deleteTask = async (id) => {
   try {
      await AsyncStorage.removeItem(id);
   } catch (e) {
      // remove error
   }
   console.log('Task removed.')
}

export const getAllTasks = async () => {
   let keys = [];
   let tasks = [];
   try {
      keys = await AsyncStorage.getAllKeys();
      for (const k of keys) {
         if (k !== '@lastId') {
            const task = await AsyncStorage.getItem(k);
            if (task !== null) {
               tasks.push(JSON.parse(task));
              // tasks.push(task);
            }
         }
         else {
            console.log('@last id - postoji');
         }
      }

      console.log('tasks.lenght: ' + tasks.lenght);
      return tasks;
   } catch (error) {
      console.log('error ovdjen')
   }
}