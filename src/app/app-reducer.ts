import {AuthAPI} from '../api/auth-api';
import {postUserAuthData, setAuthData} from '../api/auth-reducer';

let initialState = {
    status: 'loading' as RequestStatusType,
    error: null as NetworkErrorType,
    isInitialized: false
};
export const appReducer = (state: InitialStateType = initialState, action: UnionType): InitialStateType => {
    switch (action.type) {
        case 'APP/IS-INITIALIZED':
            return {...state, isInitialized: action.value};
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        case 'APP/SET-ERROR':
            return {...state, error: action.error};
        default:
            return state
    }
}

//ACTIONS
export const setAppStatus = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status}) as const
export const setAppError = (error: NetworkErrorType) =>
    ({type: 'APP/SET-ERROR', error}) as const
export const isInitialized = (value: boolean) =>
    ({type: 'APP/IS-INITIALIZED', value}) as const

//THUNK
export const initializeApp = () => (dispatch:any) => {
    AuthAPI.getAuthData().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(postUserAuthData(true))
        } else {
        }
        dispatch(isInitialized(true))
    })
}

//TYPES
type InitialStateType = typeof initialState

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type NetworkErrorType = string | null

export type UnionType = ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof isInitialized>