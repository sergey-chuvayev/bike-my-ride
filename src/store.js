import { createStore, applyMiddleware } from 'redux';
import rootStore from './reducers/';
import thunk from 'redux-thunk';

const store = createStore(
    rootStore,
    applyMiddleware(thunk)
);

export default store;