export const addTask = async (task) => {
   const url = 'https://agendamoblie.firebaseio.com/';
   const urlAddition = 'tasks.json';

   const response = await fetch(url + urlAddition, {
      method: 'POST',
      body: JSON.stringify(task)
   });

   return await response.json();
} 
