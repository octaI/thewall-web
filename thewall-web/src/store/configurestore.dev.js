import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import rootReducer from '../reducers';


export default function configureStore(initialState) {
    const finalCreateStore = compose(
        applyMiddleware(promise),
    )(createStore);

    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}