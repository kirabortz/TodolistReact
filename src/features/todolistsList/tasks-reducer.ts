import {
    addTodolist,
    deleteTodolist,
    isEntityStatus,
    resetData,
    setTodolists,
    TodolistsDomainType
} from './todolists-reducer';


import {Dispatch} from 'redux';
import {TaskProps, TasksAPI, UpdateTaskModelProps} from '../../api/tasks-api';
import {AppDispatch, RootState} from '../../app/Store';
import {RequestStatusType, setAppError, setAppStatus} from '../../app/app-reducer';
import {ServerAppErrorHandle, ServerNetworkError} from '../../components/utils/error-utils';
import {updateTaskModel} from '../../components/utils/updateItemModel';


const initialState: InitialTasksState = {};
export const tasksReducer = (state: InitialTasksState = initialState, action: UnionTypes): InitialTasksState => {

    switch (action.type) {
        case 'TASKS/SET-TASKS':
            return {...state, [action.todolistId]: action.tasks.map(task => ({...task, entityStatus: 'idle'}))}

        case 'TASKS/DELETE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }

        case 'TASKS/ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]
            };

        case 'TASKS/UPDATE-TASK':
            return {
                ...state,
                [action.updatedTask.todoListId]: state[action.updatedTask.todoListId].map(task => task.id === action.updatedTask.id
                    ? {...task, ...action.updatedTask}
                    : task)
            }

        case 'TOGGLE-ENTITY-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId
                    ? {...task, entityStatus: action.entityStatus}
                    : task)
            }

        case 'RESET-DATA':
            return {}

        case 'TODOLIST/SET-TODOLISTS':
            return {
                ...state,
                ...action.todolists.reduce((stateCopy: InitialTasksState, todolist) => {
                    stateCopy[todolist.id] = [];
                    return stateCopy;
                }, {})
            };

        case 'TODOLIST/DELETE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState

        case 'TODOLIST/ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}

        default:
            return state
    }
}

//ACTIONS
export const setTasks = (todolistId: string, tasks: TaskProps[]) => {
    return {type: 'TASKS/SET-TASKS', todolistId, tasks} as const
}
export const deleteTask = (todolistId: string, taskId: string) => {
    return {type: 'TASKS/DELETE-TASK', todolistId, taskId} as const
}
export const addTask = (task: any) => {
    return {type: 'TASKS/ADD-TASK', task} as const
}
export const updateTask = (updatedTask: TaskProps) => {
    return {type: 'TASKS/UPDATE-TASK', updatedTask} as const
}

export const toggleEntityStatus = (todoListId: string, taskId: string, entityStatus: RequestStatusType) => {
    return {type: 'TOGGLE-ENTITY-STATUS', todoListId, taskId, entityStatus} as const
}


//THUNK
export const setTasksThunk = (todolistId: string) => async (dispatch: Dispatch<UnionTypes>) => {
    dispatch(setAppStatus('loading'))

    try {
        const res = await TasksAPI.getTasks(todolistId)
        if (res.data.error === null) {
            dispatch(setTasks(todolistId, res.data.items))
            dispatch(setAppStatus('succeeded'))
        } else {
            ServerNetworkError({message: 'Some error occurred'}, dispatch)
        }
    } catch (error: any) {
        ServerNetworkError(error.message, dispatch)
    }
}

export const addTaskThunk = (todolistId: string, title: string) => async (dispatch: Dispatch<UnionTypes>) => {
    dispatch(setAppStatus('loading'))

    try {
        const res = await TasksAPI.addTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTask(res.data.data.item))
            dispatch(setAppStatus('succeeded'))
        } else {
            ServerAppErrorHandle(res.data, dispatch)
        }
    } catch (error: any) {

        ServerNetworkError(error.message, dispatch)
    }
}
export const deleteTaskThunk = (todolistId: string, taskId: string) => async (dispatch: Dispatch<UnionTypes>) => {
    dispatch(toggleEntityStatus(todolistId, taskId, 'loading'))
    dispatch(setAppStatus('loading'))
    try {
        let res = await TasksAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === 0) {
            dispatch(deleteTask(todolistId, taskId))
            dispatch(setAppStatus('succeeded'))
        } else {
            ServerAppErrorHandle(res.data, dispatch)
        }
    } catch (error: any) {
        ServerNetworkError(error.message, dispatch)
    }
}


export const updateTaskThunk = (todolistId: string, taskId: string, updatedKey: string, updatedParam: string | number) => async (dispatch: Dispatch<UnionTypes>, getState: () => RootState) => {
    dispatch(setAppStatus('loading'))
    dispatch(toggleEntityStatus(todolistId, taskId, 'loading'))
    try {
        const task = getState().tasksReducer[todolistId].find((task) => task.id === taskId)
        if (task) {
            const updatedTask: UpdateTaskModelProps = updateTaskModel(task, {[updatedKey]: updatedParam})
            const res = await TasksAPI.updateTask(todolistId, taskId, updatedTask)
            if (res.data.resultCode === 0) {
                dispatch(updateTask(res.data.data.item))
                dispatch(setAppStatus('succeeded'))
                dispatch(toggleEntityStatus(todolistId, taskId, 'succeeded'))
            } else {
                ServerAppErrorHandle(res.data, dispatch)
            }
        } else {
            alert('Task not found')
        }
    } catch (error: any) {
        ServerNetworkError(error.message, dispatch)
    }
}

//TYPES
export type InitialTasksState = {
    [key: string]: TasksDomainType[]
}

export type TasksDomainType = TaskProps & {
    entityStatus: RequestStatusType
}


type UnionTypes = ReturnType<typeof setTasks>
    | ReturnType<typeof deleteTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof deleteTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof updateTask>
    | ReturnType<typeof toggleEntityStatus>
    | ReturnType<typeof resetData>
