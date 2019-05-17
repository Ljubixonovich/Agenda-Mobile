export const getFormatedDate = (date) => {
   let dd = String(date.getDate()).padStart(2, '0');
   let mm = String(date.getMonth() + 1).padStart(2, '0');
   let yyyy = date.getFullYear();

   let today = `${dd}. ${mm}. ${yyyy}.`;
   return today;
}

export const compareDates = (date1, date2) => {
   if (date1 > date2) return false;
   else if (date1 < date2) return false;
   else return true;
}

export const getToday = () => {
   let today = new Date();
   today.setHours(0, 0, 0, 0);
   return today;
}


const addDays = (date, days) => {
   let result = new Date(date);
   result.setDate(result.getDate() + days);
   return result;
}

export const getDateArray = () => {
   let today = getToday();
   let start = addDays(today, -180);
   let end = addDays(today, 366);

   let days = new Array();
   let date = new Date(start);
   while (date <= end) {
      let d = new Date(date);
      d.setHours(0, 0, 0, 0);
      days.push(d);
      date.setDate(date.getDate() + 1);
   }
   return days;
}
