import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import uiReducer from './reducers/ui';
import taskReducer from './reducers/tasks';
import dateReducer from './reducers/date';
import rootSaga from './sagas/index';


const rootReducer = combineReducers({
   ui: uiReducer,
   tasks: taskReducer,
   date: dateReducer
});

let composeEnchancers = compose;
if (__DEV__) {
   composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      || compose;
}

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
   return createStore(rootReducer, 
      composeEnchancers(applyMiddleware(sagaMiddleware)))
};

const store = configureStore();

sagaMiddleware.run(rootSaga);


export default store;
