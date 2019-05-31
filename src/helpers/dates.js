import moment from 'moment';
import 'moment/locale/sr';

import { daysBeforeToday, numberOfDays } from '../helpers/constants';

export const getFormatedDate = (date) => {
   console.log('getFormatedDate pozvan');
   // console.log(date);
   let dd = String(date.getDate()).padStart(2, '0');
   let mm = String(date.getMonth() + 1).padStart(2, '0');
   let yyyy = date.getFullYear();

   let response = `${dd}. ${mm}. ${yyyy}.`;
   return response;
}


export const getFormatedDate2 = (date) => {   
   let response = moment(date).locale('sr').format('dddd D. MMM');
   return response;
   // Ponedeljak 15. 12.
}

export const compareDates = (date1, date2) => {
   console.log('compareDates pozvan: ');
   console.log('date1: ' + date1);
   console.log('date2: ' + date2);
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
   let start = addDays(today, (daysBeforeToday() - (2 * daysBeforeToday())));
   let end = addDays(today, numberOfDays());
   // let start = addDays(today, -10);
   // let end = addDays(today, 50);

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


