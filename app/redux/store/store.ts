import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import rootReducer, { RootState } from '../reducers/combineReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store<RootState> = createStore(persistedReducer, applyMiddleware(thunk));
const persistor: Persistor = persistStore(store);

export { store, persistor };