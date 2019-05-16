
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
