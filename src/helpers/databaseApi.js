export const addTask = async (task) => {
   const url = '';
   const urlAddition = '';

   

   const response = await fetch(url + urlAddition, {
      method: 'POST',
      body: JSON.stringify(task)
   });

   return await response.json();
} 