import { configureStore } from '@reduxjs/toolkit';
// import { reducer } from './reducer';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { listReducer } from './list/listSlice';

const persistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};

const persistedReducer = persistReducer(persistConfig, listReducer);
// const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({ reducer: reducer });
// configureStore обязательно принимает объект
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// весь state будет записываться в LocalStorrage
export const persistor = persistStore(store);
