import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { analyticsSlice } from "./reducer";
import {createWrapper} from 'next-redux-wrapper';

const combinedReducer = combineReducers({
    [analyticsSlice.name]: analyticsSlice.reducer,
  });
  
function makeStore() {
    return configureStore(
        {
            reducer: combinedReducer,
        }
    )
}

export const wrapper = createWrapper(makeStore);