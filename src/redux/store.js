import { configureStore } from "@reduxjs/toolkit";
import bookReducer from './slices/bookslice';

export const store = configureStore({
    reducer: {
        books: bookReducer
    }
});