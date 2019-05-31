import moment from 'moment';
import 'moment/locale/sr';

import { daysBeforeToday, numberOfDays } from '../helpers/constants';

export const getFormatedDate = (date) => {
   let dd = String(date.getDate()).padStart(2, '0');
   let mm = String(date.getMonth() + 1).padStart(2, '0');
   let yyyy = date.getFullYear();

   let response = `${dd}. ${mm}. ${yyyy}.`;
   return response;
}


export const getSerbianDate = (date) => { 
   // Ponedeljak 15. 12.  
   let response = moment(date).locale('sr').format('dddd D. MMM');
   return response;   
}

export const compareDates = (date1, date2) => {
   // Date.parse - konvertuje u format: 1559167200000
   let d1 = Date.parse(date1);
   let d2 = Date.parse(date2);

   if (d1 > d2) return false;
   else if (d1 < d2) return false;
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
   let start = addDays(today, (daysBeforeToday() - (2 * daysBeforeToday())));
   let end = addDays(today, numberOfDays());

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


