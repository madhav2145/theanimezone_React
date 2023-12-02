import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authreducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // ...other reducers if any
  },
});

export default store;