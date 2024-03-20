import React, {useEffect, useState} from 'react';
// import {TasksAPI} from '../../../api/tasks-api';


export default {
    title: 'API/TASKS',
}
//
// export const getTasks = () => {
//     const [state, setState] = useState<any>(null)
//     const [todoId, setTodoId] = useState<string>('')
//
//     const getTasksHandler = () => {
//         TasksAPI.getTasks(todoId)
//             .then(res => {
//                 setState(res.data.items)
//             })
//     }
//     return (
//         <div>
//             {JSON.stringify(state)}
//             <input value={todoId} placeholder={'todoId'} onChange={(e) => setTodoId(e.currentTarget.value)}/>
//             <button onClick={getTasksHandler}>GetTasks</button>
//         </div>
//     )
// }
// export const addTask = () => {
//     const [state, setState] = useState<any>(null)
//     const [title, setTitle] = useState<string>('')
//     const [todoId, setTodoId] = useState<string>('')
//
//     const addTaskHandler = () => {
//         TasksAPI.addTask(todoId, title)
//             .then(res => {
//                 setState(res.data)
//             })
//     }
//
//     return (
//         <div>
//             {JSON.stringify(state)}
//             <input value={todoId} placeholder={'todoID'} onChange={(e) => setTodoId(e.currentTarget.value)}/>
//             <input value={title} placeholder={'title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
//             <button onClick={addTaskHandler}>CreateTask</button>
//         </div>
//     )
// }
// export const deleteTask = () => {
//     const [state, setState] = useState<any>(null)
//     const [todoId, setTodoId] = useState<string>('')
//     const [taskId, setTaskId] = useState<string>('')
//
//     const deleteTaskHandler = () => {
//         TasksAPI.deleteTask(todoId, taskId)
//             .then(res => {
//                 setState(res.data.data)
//             })
//     }
//     return (
//         <div>
//             {JSON.stringify(state)}
//             <input value={todoId} placeholder={'todoID'} onChange={(e) => setTodoId(e.currentTarget.value)}/>
//             <input value={taskId} placeholder={'taskID'} onChange={(e) => setTaskId(e.currentTarget.value)}/>
//             <button onClick={deleteTaskHandler}>DeleteTask</button>
//         </div>
//     )
// }
// export const updateTask = () => {
//     const [state, setState] = useState<any>(null)
//     const [title, setTitle] = useState<string>('title 1')
//     const [description, setDescription] = useState<string>('desc 1')
//     const [status, setStatus] = useState<number>(0)
//     const [priority, setPriority] = useState<number>(0)
//     const [startDate, setStartDate] = useState<string>('')
//     const [deadline, setDeadline] = useState<string>('')
//
//     const [todolistId, setTodolistId] = useState<string>('')
//     const [taskId, setTaskId] = useState<string>('')
//
//
//     const updateTaskHandler = () => {
//         TasksAPI.updateTask(todolistId, taskId, {
//             title: title,
//             description: description,
//             status: status,
//             priority: priority,
//             startDate: '',
//             deadline: ''
//         })
//             .then(res => {
//                 setState(res.data.data.item.title)
//                 alert('Updated successfully')
//             })
//     }
//
//
//     return (
//         <div>
//             {JSON.stringify(state)}
//             <input value={todolistId} placeholder={'todoID'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
//             <input value={taskId} placeholder={'taskID'} onChange={(e) => setTaskId(e.currentTarget.value)}/>
//             <input value={title} placeholder={'title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
//             <input value={description} placeholder={'desc'} onChange={(e) => setDescription(e.currentTarget.value)}/>
//             <input value={status} placeholder={'status'} onChange={(e) => setStatus(+e.currentTarget.value)}/>
//             <input value={priority} placeholder={'priority'} onChange={(e) => setPriority(+e.currentTarget.value)}/>
//             <button onClick={updateTaskHandler}>UpdateTask</button>
//         </div>
//     )
// }