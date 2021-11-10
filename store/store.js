import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import serverUrlReducer from './reducers/serverURL';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
    serverUrl: persistReducer(persistConfig, serverUrlReducer),
  });

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
