const validate = (val, rules) => {
   let isValid = true;
   for (let rule in rules) {
     switch (rule) {
       case 'isEmail':
         isValid = isValid && emailValidator(val);
         break;
       case 'minLength':
         isValid = isValid && minLengthValidator(val, rules[rule]);
         break;
       case 'notEmpty':
         isValid = isValid && notEmptyValidator(val);
         break;
      case 'isTime':
         isValid = isValid && isCorrectTime(val);
       default:
         isValid = true;
         break;
     }
   }
   return isValid;
 }
 
 const emailValidator = val => {
   return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
     .test(val);
 }
 
 const minLengthValidator = (val, minLength) => {
   return val.length >= minLength;
 }
 
 const notEmptyValidator = val => {
   return val.trim() !== '';
 }

 const isCorrectTime = val => {
    return true;
 }
 
 export default validate;
 