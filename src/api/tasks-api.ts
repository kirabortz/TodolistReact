import axios from 'axios';
import {ResponseProps} from './todolist-api';
import {RequestStatusType} from '../app/app-reducer';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '489ad17e-0586-425f-bd3e-edeb04de1502'
    }
})

//API
export const TasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<TasksResponseProps>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseProps<{ item: TaskProps }>>(`todo-lists/${todolistId}/tasks/`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseProps>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelProps) {
        return instance.put<ResponseProps<{ item: TaskProps }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

//TYPES

export enum TaskStatuses {
    New,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskProps = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export type UpdateTaskModelProps = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    entityStatus?: RequestStatusType
}


export type TasksResponseProps = {
    error: string | null
    totalCount: number
    items: TaskProps[]
}