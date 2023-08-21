import { applyMiddleware, compose, configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';



const persistConfig = {
  key: 'root', // This key is used to store the data in localStorage
  storage,
  whitelist: ['cart'], // Add the reducers that need to be persisted here
};


const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean);



const composeEnhancer =
  (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleWares),
  devTools: process.env.NODE_ENV !== 'production', // Enable devtools in non-production environment
});

export default store;

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)