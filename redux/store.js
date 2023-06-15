import { createStore, combineReducers } from 'redux';
import addCartReducer from './reducers/addCartReducer';

const rootReducer = combineReducers({
    cart: addCartReducer,
});

export const store = createStore(rootReducer);