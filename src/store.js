import { configureStore } from "@reduxjs/toolkit";
import global from "./redux/slices/global";
import storageSession from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import { combineReducers } from "redux"

const persistConfig = {
    key: 'root',
    storage:storageSession,
    version: 1,
}


const reducers = combineReducers({
    global,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

})

export const persistor = persistStore(store);


