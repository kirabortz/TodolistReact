import {Dispatch} from 'redux';
import {todolistAPI, TodolistProps} from '../../api/todolist-api';
import {RequestStatusType, setAppError, setAppStatus} from '../../app/app-reducer';

import {AppDispatch, RootState} from '../../app/Store';
import {ServerAppErrorHandle, ServerNetworkError} from '../../components/utils/error-utils';
import {updateTodolistModel} from '../../components/utils/updateItemModel';
import {setTasksThunk} from "./tasks-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AxiosError} from "axios";


const initialState: TodolistsDomainType[] = []
export const todolistsReducer = (state: TodolistsDomainType[] = initialState, action: UnionTypes): TodolistsDomainType [] => {
    switch (action.type) {
        case 'TODOLIST/SET-TODOLISTS':
            return action.todolists.map((todolist) => ({...todolist, filter: 'all', entityStatus: 'idle'}))

        case 'TODOLIST/ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]

        case 'TODOLIST/DELETE-TODOLIST':
            return state.filter((tl) => tl.id !== action.todolistId)

        case 'TODOLIST/UPDATE-TODOLIST':
            return state.map((tl) => tl.id === action.updatedTodolist.id
                ? {...tl, ...action.updatedTodolist}
                : tl);
        case 'TODOLIST/IS-ENTITY-STATUS':
            return state.map(el => el.id === action.todolistId ? {...el, entityStatus: action.entityStatus} : el)

        case 'RESET-DATA':
            return []
        // return  state.map((item) => ({...item, entityStatus:action.entityStatus}))
        // case 'TODOLIST/CROP-TODOLISTS':
        //     return state

        default:
            return state
    }
}

//ACTIONS
export const setTodolists = (todolists: TodolistProps[]) => {
    return {type: 'TODOLIST/SET-TODOLISTS', todolists} as const
}
export const addTodolist = (todolist: TodolistProps) => {
    return {type: 'TODOLIST/ADD-TODOLIST', todolist} as const
}
export const updateTodolist = (updatedTodolist: TodolistsDomainType) => {
    return {type: 'TODOLIST/UPDATE-TODOLIST', updatedTodolist} as const
}
export const deleteTodolist = (todolistId: string) => {
    return {type: 'TODOLIST/DELETE-TODOLIST', todolistId} as const
}
export const isEntityStatus = (todolistId: string, entityStatus: RequestStatusType) => {
    return {type: 'TODOLIST/IS-ENTITY-STATUS', todolistId, entityStatus} as const
}
export const resetData = () => {
    return {type: 'RESET-DATA'} as const
}
export const todolistsCrop = (todolistsPaginate: any) => {
    return {type: 'TODOLIST/CROP-TODOLISTS', todolistsPaginate} as const
}

//THUNK
export const getTodolistThunk = () => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await todolistAPI.getTodolist()
        dispatch(setTodolists(res.data))
            .todolists?.forEach((tl) => {
            dispatch(setTasksThunk(tl.id))
        })
        dispatch(setAppStatus('succeeded'))
    } catch (error:any) {
        ServerNetworkError(error.message, dispatch)
    }
}

export const addTodolistThunk = (title: string) => async (dispatch: Dispatch<UnionTypes>) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await todolistAPI.addTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodolist(res.data.data.item))
            dispatch(setAppStatus('succeeded'))
        } else {
            ServerAppErrorHandle(res.data, dispatch)
        }
    } catch (error:any) {
        ServerNetworkError(error.message, dispatch)
    }

}
export const deleteTodolistThunk = (todolistId: string) => async (dispatch: Dispatch<UnionTypes>) => {
    dispatch(setAppStatus('loading'))
    dispatch(isEntityStatus(todolistId, 'loading'))
    try {
        const res = await todolistAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(deleteTodolist(todolistId))
            dispatch(setAppStatus('succeeded'))
            dispatch(isEntityStatus(todolistId, 'succeeded'))
        } else {
            ServerAppErrorHandle(res.data, dispatch)
        }
    } catch (error:any) {
        ServerNetworkError(error.message, dispatch)
    }
}


export const updateTodolistThunk = (todolistId: string, updatedKey: string, updatedParam: string | number) => async (dispatch: Dispatch<UnionTypes>, getState: () => RootState) => {
    dispatch(setAppStatus('loading'))
    try {
        const todolist = getState().todolistsReducer.find((tl) => tl.id === todolistId)
        if (todolist) {
            const updatedTodolist: TodolistsDomainType = updateTodolistModel(todolist, {[updatedKey]: updatedParam})
            const res = await todolistAPI.updateTodolist(todolistId, updatedParam)
            if (res.data.resultCode === 0) {
                dispatch(updateTodolist(updatedTodolist))
                // dispatch(updateTodolist(res.data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                ServerAppErrorHandle(res.data, dispatch)
            }
        } else {
            alert('Todolist not found')
        }
    } catch (error:any) {
        ServerNetworkError(error.message, dispatch)
    }
}


//types

type UnionTypes = ReturnType<typeof setTodolists>
    | ReturnType<typeof deleteTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof updateTodolist>
    | ReturnType<typeof todolistsCrop>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof isEntityStatus>
    | ReturnType<typeof resetData>


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsDomainType = TodolistProps & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
