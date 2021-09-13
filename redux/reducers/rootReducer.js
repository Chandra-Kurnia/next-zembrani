import {combineReducers} from 'redux';
import vehicleReducer from './vehilceReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  vehicle: vehicleReducer,
  user: userReducer
});

export default rootReducer;
