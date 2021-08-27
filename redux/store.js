import {createStore, applyMiddleware} from 'redux';
// import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers/rootReducer';
// import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// const persistConfig = {
//   key: 'zembrani',
//   storage
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
// const stores = () => {
//   let store = createStore(persistedReducer);
//   let persistor = persistStore(store);
//   return {store, persistor};
// };
export default store;
