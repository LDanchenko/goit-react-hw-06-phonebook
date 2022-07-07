import { configureStore, combineReducers } from '@reduxjs/toolkit';
import filterReducer from './filter';

const rootReducer = combineReducers({
  contacts: combineReducers({
    filter: filterReducer,
  }),
});

export const store = configureStore({
  reducer: rootReducer,
});
