import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './../reducers/index';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './../sagas/index';

const composeEnhancer =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

const configStore = () => {
  const middleWares = [thunk, sagaMiddleware];
  const enhancers = [applyMiddleware(...middleWares)];
  const store = createStore(rootReducer, composeEnhancer(...enhancers));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configStore;
