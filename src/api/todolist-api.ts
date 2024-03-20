import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '489ad17e-0586-425f-bd3e-edeb04de1502'
    }
})

//API
export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistProps[]>(`todo-lists`)
    },
    addTodolist(title: string) {
        return instance.post<ResponseProps<{ item: TodolistProps }>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseProps>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string,title:any) {
        return instance.put<ResponseProps<{ item: TodolistProps }>>(`todo-lists/${todolistId}`,{title})
    },
}

//TYPES
export type TodolistProps = {
    id: string
    addedDate: string
    order: number
    title: string
}

type FieldErrorProps = {
    error: string
    field: string
}

export type ResponseProps<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: FieldErrorProps[]
    data: D
}