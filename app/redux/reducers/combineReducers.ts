import { combineReducers, Reducer } from 'redux';
import authReducer from './authReducer';

interface RootState {
  auth: any; // Replace 'any' with the specific type of your auth reducer state
}

const rootReducer: Reducer<RootState> = combineReducers({
  auth: authReducer,
});

export default rootReducer;