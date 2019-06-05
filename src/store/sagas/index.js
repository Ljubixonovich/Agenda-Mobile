import { call, put, takeLatest } from 'redux-saga/effects';
import {
   GET_TASKS_SAGA,
   GET_TASKS_REDUCER,
   ADD_TASK_SAGA,
   ADD_TASK_REDUCER,
   EDIT_TASK_SAGA,
   EDIT_TASK_REDUCER,
   DELETE_TASK_SAGA,
   DELETE_TASK_REDUCER,
   DO_SOMETHING,
   UI_START_LOADING,
   UI_STOP_LOADING
} from '../actions/actionTypes';
import * as api from '../../helpers/asyncStorage';

function* getTasks(action) {

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

      yield put({ type: ADD_TASK_REDUCER, task: action.payload });
   } catch (error) {
      console.log('error saga addTask');
   }
}


function* editTask(action) {
   try {
      yield call(api.editTask, action.payload);
      
      yield put({ type: EDIT_TASK_REDUCER, task: action.payload, id: action.payload.id });
   } catch (error) {
      console.log('error saga editTask');
   }
}


function* deleteTask(action) {
   try {
      yield call(api.deleteTask, action.payload);

      yield put({ type: DELETE_TASK_REDUCER, id: action.payload });
   } catch (error) {
      console.log('error saga deleteTask');
   }
}


function* doSomething(action) {
   let result = yield call(api.getLastId);
   alert(result);
}

export default function* rootSaga() {
   yield takeLatest(GET_TASKS_SAGA, getTasks);
   yield takeLatest(ADD_TASK_SAGA, addTask);
   yield takeLatest(DO_SOMETHING, doSomething);
   yield takeLatest(DELETE_TASK_SAGA, deleteTask);
   yield takeLatest(EDIT_TASK_SAGA, editTask);
}
