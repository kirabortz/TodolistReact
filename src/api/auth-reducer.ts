import {Dispatch} from 'redux';
import {setAppStatus} from '../app/app-reducer';
import {todolistAPI} from './todolist-api';
import {ServerAppErrorHandle, ServerNetworkError} from '../components/utils/error-utils';
import {setTodolists} from '../features/todolistsList/todolists-reducer';
import {AuthAPI} from './auth-api';


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
export const setAuthData = (data: any) =>
    ({type: 'SET-AUTH-DATA', data}) as const
export const postUserAuthData = (value: boolean) =>
    ({type: 'POST-USER-AUTH-DATA', value}) as const
export const deleteUserAuthData = (value: boolean) =>
    ({type: 'DELETE-USER-AUTH-DATA', value}) as const

//THUNK
export const getAuth = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await AuthAPI.getAuthData()
        res.data.resultCode === 0
            ? (dispatch(postUserAuthData(true)),
                dispatch(setAppStatus('succeeded')))
            : ServerAppErrorHandle(res.data, dispatch)

    } catch (error) {
        // @ts-ignore
        ServerNetworkError(error.message, dispatch)
    }
}
export const login = (userData: any) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await AuthAPI.login(userData.email, userData.password ,userData.rememberMe)
        res.data.resultCode === 0
            ? (dispatch(postUserAuthData(true)),
                dispatch(setAppStatus('succeeded')))
            : ServerAppErrorHandle(res.data, dispatch)

    } catch (error) {
        // @ts-ignore
        ServerNetworkError(error.message, dispatch)
    }
}
export const logout = () => (dispatch:any) => {
    dispatch(setAppStatus('loading'))
    AuthAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(postUserAuthData(false))
                dispatch(setAppStatus('succeeded'))
            } else {
                ServerAppErrorHandle(res.data, dispatch)
            }
        })
        .catch(error => {
            ServerNetworkError(error, dispatch)
        })
}

//TYPES
type InitialStateType = typeof initialState

export type UnionType = ReturnType<typeof setAuthData>
    | ReturnType<typeof postUserAuthData>
