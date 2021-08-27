import {combineReducers} from 'redux';
import vehicleReducer from './vehilceReducer';

const rootReducer = combineReducers({
  vehicle: vehicleReducer,
});

export default rootReducer;
