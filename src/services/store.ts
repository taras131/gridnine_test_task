import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/flightSlice';

const rootReducer = combineReducers({
    flight: ingredientsReducer,
});
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: false,
            })
    });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];