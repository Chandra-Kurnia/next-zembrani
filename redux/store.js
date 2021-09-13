import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfigs = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfigs, rootReducer)

let store = createStore(persistedReducer, applyMiddleware(thunk))
// let persistor = persistStore(store)
export {
    store,
}
// export default () => {
//     let store = createStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
//   }

// const store = createStore(rootReducer, applyMiddleware(thunk, logger));
// export default store;
