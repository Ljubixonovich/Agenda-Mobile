import { call, put, takeLatest } from 'redux-saga/effects';
import { 
   GET_TASKS_SAGA, 
   GET_TASKS_REDUCER,
   ADD_TASK_SAGA,
   ADD_TASK_REDUCER,
   DO_SOMETHING,
   UI_START_LOADING,
   UI_STOP_LOADING 
} from '../actions/actionTypes';
import * as api from '../../helpers/databaseApi';
import { mockTasks } from '../../helpers/mockTasks';

function* getTasks(action) {
   // yield put({ type: UI_START_LOADING});
   // yield put({ type: UI_STOP_LOADING});

   // yield call to database
   let tasks = mockTasks;
   
   try {
      yield put({ type: GET_TASKS_REDUCER, tasks: tasks });
      
   } catch (error) {
      console.log(error);
   }   
}


function* addTask(action) {

   try {
      // const result = yield call(api.addTask, action.payload);
      // console.log(result);
      yield put({ type: ADD_TASK_REDUCER, task: action.payload});

   } catch (error) {
      console.log(error);
   }


   // console.log('1: ' + JSON.stringify(action));
   // api.addTask(action.payload);
}


function* doSomething(action) {
   yield put({ type: UI_START_LOADING});
}

export default function* rootSaga() {
   yield takeLatest(GET_TASKS_SAGA, getTasks);
   yield takeLatest(ADD_TASK_SAGA, addTask);
   yield takeLatest(DO_SOMETHING, doSomething);
}
