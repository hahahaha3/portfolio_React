import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persisConfig = {
    key: 'main-root',
    storage
}

const persistedReducer = persistReducer(persisConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware());
const persistor = persistStore(store);

export {persistor};
export default store;