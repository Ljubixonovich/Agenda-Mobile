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
import * as api from '../../helpers/asyncStorage';

function* getTasks(action) {
   // yield put({ type: UI_START_LOADING});
   // yield put({ type: UI_STOP_LOADING});

   // yield call to database
   // let tasks = mockTasks;
   
   try {
      let tasks = yield call(api.getAllTasks);
      tasks = !tasks ? [] : tasks;
      yield put({ type: GET_TASKS_REDUCER, tasks: tasks });
      
   } catch (error) {
      console.log(error);
   }   
}


function* addTask(action) {

   try {
     yield call(api.addTask, action.payload);
     
      console.log('jel posle ovog greska?');

      yield put({ type: ADD_TASK_REDUCER, task: action.payload});
      
      console.log('kraj?');

   } catch (error) {
      console.log('kanda je ova greska!');
      console.log(error);
   }

   // console.log('1: ' + JSON.stringify(action));
   // api.addTask(action.payload);
}


function* doSomething(action) {
   let result = yield call(api.getLastId);
   alert(result);
}

export default function* rootSaga() {
   yield takeLatest(GET_TASKS_SAGA, getTasks);
   yield takeLatest(ADD_TASK_SAGA, addTask);
   yield takeLatest(DO_SOMETHING, doSomething);
}
