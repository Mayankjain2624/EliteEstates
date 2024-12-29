import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/useSlice'

// const rootReducer=combineReducers({user : userReducer})

// const persisted
export const store = configureStore({
  reducer: {user:userReducer},
  middleware : 
  (getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false,

  }),
})