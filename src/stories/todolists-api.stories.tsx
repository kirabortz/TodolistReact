import React, {useEffect, useState} from 'react';
// import {todolistAPI} from '../../api/todolist-api';

export default {
    title: 'API/TODOS',
}

// export const getTodolists = () => {
//     const [state, setState] = useState<any>(null)
//
//     useEffect(() => {
//         todolistAPI.getTodolist()
//             .then(res => {
//                 setState(res.data)
//             })
//     }, [])
//     return <div>{JSON.stringify(state)}</div>
// }
// export const addTodolist = () => {
//     const [state, setState] = useState<any>(null)
//
//     const addTodolistHandler = () => {
//         todolistAPI.addTodolist(state).then(res => {
//             setState(res.data)
//         })
//     }
//
//     return (
//         <div>
//             {JSON.stringify(state)}
//             <input value={state} placeholder={'title'} onChange={(e) => setState(e.currentTarget.value)}/>
//             <button onClick={addTodolistHandler}>CreateTodo</button>
//         </div>
//     )
// }
// export const deleteTodolist = () => {
//     const [state, setState] = useState<any>(null)
//
//     const deleteTodolistHandler = () => {
//         todolistAPI.deleteTodolist(state).then(res => {
//             setState(res.data)
//         })
//     }
//
//     return (
//         <div>
//             {JSON.stringify(state)}
//             <input value={state} placeholder={'todoId'} onChange={(e) => setState(e.currentTarget.value)}/>
//             <button onClick={deleteTodolistHandler}>DeleteTodo</button>
//         </div>
//     )
// }
// export const updateTodolistTitle = () => {
//     const [state, setState] = useState<any>(null)
//     const [todoId, setTodoId] = useState<string>('')
//
//     const updateTodolistHandler = () => {
//         todolistAPI.updateTodolist(todoId, state).then(res => {
//             setState(res.data)
//         })
//     }
//
//     return (
//         <div>
//             {JSON.stringify(state)}
//             <input value={state} placeholder={'title'} onChange={(e) => setState(e.currentTarget.value)}/>
//             <input value={todoId} placeholder={'todoId'} onChange={(e) => setTodoId(e.currentTarget.value)}/>
//             <button onClick={updateTodolistHandler}>UpdateTodo</button>
//         </div>
//     )
// }