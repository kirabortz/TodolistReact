import {combineReducers} from 'redux';

import {configureStore} from '@reduxjs/toolkit';
import {tasksReducer} from '../features/todolistsList/tasks-reducer';
import {todolistsReducer} from '../features/todolistsList/todolists-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from './app-reducer';
import {authReducer} from '../api/auth-reducer';



const RootReducer = combineReducers({
    tasksReducer,
    todolistsReducer,
    appReducer,
    authReducer
})


export const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type RootReducerType = ReturnType<typeof RootReducer>
export type RootState = ReturnType<typeof store.getState> //типизация стейта
export type AppDispatch = typeof store.dispatch //для санок типизация диспатча
export const useAppDispatch: () => AppDispatch = useDispatch //для санок кастом для диспатча
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector //кастом для селектора

// @ts-ignore
window.store = store;
