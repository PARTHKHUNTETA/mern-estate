
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({ user: userSlice });

const persistConfig = {
    key: "root",
    version: 1,
    storage // or whatever you prefer

}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

})

export const persistor = persistStore(store);