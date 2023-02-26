import { configureStore } from '@reduxjs/toolkit'
import petReducer from './slices/Pets';

const reducer = {
  pets: petReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;