import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import promise from 'redux-promise';

import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig,rootReducer);

// Middleware you want to use in production:
const enhancer = applyMiddleware(promise);

export default function configureStore(initialState) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    let store = createStore(persistedReducer, initialState, enhancer);
    let persistor = persistStore(store);

    return {store,persistor}
};