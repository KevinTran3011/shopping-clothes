import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';


const loggerMiddleware =  (store) =>(next) =>(action) =>{
  if(!action.type){
    return next(action);
  }
  console.log('type' , action.type);
  console.log(store.getState());

  next(action);



}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleWares = [loggerMiddleware];

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleWares),
  devTools: process.env.NODE_ENV !== 'production', // Enable devtools in non-production environment
});

export default store;

export const persistor = persistStore(store)