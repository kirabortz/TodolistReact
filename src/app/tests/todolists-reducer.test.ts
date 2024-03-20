import {
    addTodolist, addTodolistThunk,
    deleteTodolist,
    FilterValuesType,
    TodolistsDomainType,
    todolistsReducer,
} from '../../features/todolistsList/todolists-reducer'
import {v1} from 'uuid'


// let todolistId1: string
// let todolistId2: string
// let startState: TodolistsDomainType[]

// beforeEach(() => {
//     todolistId1 = v1()
//     todolistId2 = v1()
//
//
//     startState = [
//         {
//             id: todolistId1,
//             title: 'qwe',
//             addedDate: '2024-03-03T10:53:24.877',
//             order: -4,
//             filter: 'all'
//         },
//         {
//             id: todolistId2,
//             title: '77',
//             addedDate: '2024-03-03T10:53:24.877',
//             order: -4,
//             filter: 'all'
//
//         }
//     ]
// })

// test('correct todolist should be removed', () => {
//     const remTodolistRed = todolistsReducer(startState, deleteTodolist(todolistId1))
//
//     expect(remTodolistRed.length).toBe(1)
//     expect(remTodolistRed[0].id).toBe(todolistId2)
// })
//
// test('correct todolist should be added', () => {
//
//
//
//
// })
//
// test('correct todolist should change its name', () => {
//     let newTodolistTitle = 'New Todolist'
//     const endState = todolistsReducer(startState, updateTitleTodolist(todolistId2, newTodolistTitle))
//
//     expect(endState[0].title).toBe('What to learn')
//     expect(endState[1].title).toBe(newTodolistTitle)
// })
//
// test('correct filter of todolist should be changed', () => {
//     let newFilter: FilterValuesType = 'completed'
//     const endState = todolistsReducer(startState, updateFilterTodolist(todolistId2, newFilter))
//
//     expect(endState[0].filter).toBe('all')
//     expect(endState[1].filter).toBe(newFilter)
// })