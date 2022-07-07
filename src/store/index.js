import { configureStore, combineReducers } from '@reduxjs/toolkit';
import filterReducer from './filter';
import itemsReducer from './items';

const rootReducer = combineReducers({
  contacts: combineReducers({
    filter: filterReducer,
    items: itemsReducer,
  }),
});

export const store = configureStore({
  reducer: rootReducer,
});
