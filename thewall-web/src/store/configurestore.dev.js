import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import rootReducer from '../reducers';
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig,rootReducer);

export default function configureStore(initialState) {
    const finalCreateStore = compose(
        applyMiddleware(promise),
    )(createStore);

    let store = finalCreateStore(persistedReducer, initialState);
    let persistor = persistStore(store);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return {store, persistor};
}