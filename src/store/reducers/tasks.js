import { REMOVE_TASK_REDUCER, GET_TASKS_REDUCER, ADD_TASK_REDUCER } from '../actions/actionTypes';

const initialState = {
   tasks: []
};

const reducer = (state = initialState, action) => {
   switch (action.type) {

      case GET_TASKS_REDUCER:
         return {
            ...state,
            tasks: action.tasks
         }

      case ADD_TASK_REDUCER:         
         let newTasks = [...state.tasks, action.task];
         return {
            ...state,
            tasks: newTasks
         }   

      case REMOVE_TASK_REDUCER:
         return {
            ...state,
            tasks: state.tasks.filter(t => t.id !== action.id)
         };

      default:
         return state;
   }
};

export default reducer;
