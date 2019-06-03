import { DELETE_TASK_REDUCER, GET_TASKS_REDUCER, ADD_TASK_REDUCER, EDIT_TASK_REDUCER } from '../actions/actionTypes';

const initialState = {
   tasks: []
};

const reducer = (state = initialState, action) => {
   switch (action.type) {

      case GET_TASKS_REDUCER:
         if (state.tasks.length > 0) {
            return {
               ...state,
               tasks: state.tasks
            }
         } else {
            return {
               ...state,
               tasks: action.tasks
            }
         }


      case ADD_TASK_REDUCER:
         let newTasks = [...state.tasks, action.task];
         return {
            ...state,
            tasks: newTasks
         }


      case EDIT_TASK_REDUCER:
         // add logic here
         return{
            ...state
         }



      case DELETE_TASK_REDUCER:
         return {
            ...state,
            tasks: state.tasks.filter(t => t.id !== action.id)
         };

      default:
         return state;
   }
};

export default reducer;
