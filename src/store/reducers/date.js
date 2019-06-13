import { SET_DATE, RESET_DATE } from '../actions/actionTypes';

const initialState = {
   choosedDate: null
};

const reducer = (state = initialState, action) => {
   switch (action.type) {

      case SET_DATE:
         return {
            ...state,
            choosedDate: action.date
         };

      case RESET_DATE:
         return {
            ...state,
            choosedDate: null
         };

      default:
         return state;
   }
};

export default reducer;
