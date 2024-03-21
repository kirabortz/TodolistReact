import {Dispatch} from 'redux';
import {setAppStatus} from '../app/app-reducer';
import {todolistAPI} from './todolist-api';
import {ServerAppErrorHandle, ServerNetworkError} from '../components/utils/error-utils';
import {setTodolists} from '../features/todolistsList/todolists-reducer';
import {AuthAPI} from './auth-api';
import {AppDispatch} from "../app/Store";
import {LoginType} from "../features/login/Login";


let initialState = {
    isLoggedIn: false,
};
export const authReducer = (state: InitialStateType = initialState, action: UnionType): InitialStateType => {
    switch (action.type) {
        case 'SET-AUTH-DATA':
            return {...state, ...action.data};
        case 'POST-USER-AUTH-DATA':
            return {...state, isLoggedIn: action.value};
        default:
            return state
    }
}

//ACTIONS
export const setAuthData = (data: LoginType) =>
    ({type: 'SET-AUTH-DATA', data}) as const
export const postUserAuthData = (value: boolean) =>
    ({type: 'POST-USER-AUTH-DATA', value}) as const

//THUNK
export const getAuth = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await AuthAPI.getAuthData()
        res.data.resultCode === 0
            ? (dispatch(postUserAuthData(true))
                ,dispatch(setAppStatus('succeeded')))
            : ServerAppErrorHandle(res.data, dispatch)
    } catch (error:any) {
        ServerNetworkError(error.message, dispatch)
    }
}
export const login = (userData: LoginType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await AuthAPI.login(userData.email, userData.password ,userData.rememberMe)
        res.data.resultCode === 0
            ? dispatch(getAuth())
            : ServerAppErrorHandle(res.data, dispatch)
    } catch (error) {
        ServerNetworkError(error as {message:string}, dispatch)
    }
}
export const logout = () => async (dispatch:Dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await AuthAPI.logout()
        res.data.resultCode === 0
            ? (dispatch(postUserAuthData(false))
                , dispatch(setAppStatus('succeeded')))
            : ServerAppErrorHandle(res.data, dispatch)
    }catch (error:any) {
        ServerNetworkError(error, dispatch)
    }
}

//TYPES
type InitialStateType = typeof initialState


export type UnionType = ReturnType<typeof setAuthData>
    | ReturnType<typeof postUserAuthData>
