import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authStore from './authStore';

const rootReducer = combineReducers({
    authStore
});



const store = configureStore({
    reducer: rootReducer
});


export default store;

