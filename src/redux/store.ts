import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// Use conditional storage for SSR compatibility
let storage: any;
if (typeof window !== 'undefined') {
  storage = require('redux-persist/lib/storage').default;
} else {
  // Create a noop storage for SSR
  storage = {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
}

import completeWithWalletReducer from './completeWithWalletSlice';
import globalOnLoadDataReducer from './globalOnLoadDataSlice';
import walletConnectReducer from './walletConnectSlice';
import settingsModalReducer from './settingsModalSlice';
import walletReducer from './walletSlice';

const rootReducer = combineReducers({
  completeWithWallet: completeWithWalletReducer,
  globalOnLoadData: globalOnLoadDataReducer,
  walletConnect: walletConnectReducer,
  settingsModal: settingsModalReducer,
  wallet: walletReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['completeWithWallet', 'settingsModal', 'globalOnLoadData'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;