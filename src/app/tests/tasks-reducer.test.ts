import {v1} from 'uuid';
// import {
//     addTask,
//     deleteTask,
//     tasksReducer, updateStatusTask, updateTitleTask
// } from './tasks-reducer';
//
//
// import {TasksStateProps} from './todolist/Todolist';
// import {TaskPriorities, TaskStatuses} from '../../../api/tasks-api';
// import {deleteTodolist} from './todolists-reducer';
//
// let todolistId1: string
// let todolistId2: string
// let startState: TasksStateProps

// beforeEach(() => {
//     todolistId1 = v1()
//     todolistId2 = v1()
//     startState = {
//         [todolistId1]: [
//             {
//                 id: v1(), title: 'HTML&CSS', description: '',
//                 status: TaskStatuses.Completed,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 id: v1(), title: 'JS', description: '',
//                 status: TaskStatuses.Completed,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 id: v1(), title: 'ReactJS', description: '',
//                 status: TaskStatuses.New,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 id: v1(), title: 'Rest API', description: '',
//                 status: TaskStatuses.New,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 id: v1(), title: 'GraphQL', description: '',
//                 status: TaskStatuses.New,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 addedDate: ''
//             },
//         ],
//         [todolistId2]: [
//             {
//                 id: v1(), title: 'qwe', description: '',
//                 status: TaskStatuses.Completed,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 id: v1(), title: 'asd', description: '',
//                 status: TaskStatuses.Completed,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 id: v1(), title: 'zxc', description: '',
//                 status: TaskStatuses.New,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 id: v1(), title: 'rty', description: '',
//                 status: TaskStatuses.New,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 id: v1(), title: 'fgh', description: '',
//                 status: TaskStatuses.New,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 addedDate: ''
//             },
//         ]
//     }
// })
//
// test('remove tasks from deleted todolist', () => {
//     const finalState = tasksReducer(startState, deleteTodolist(todolistId1))
//
//     expect(startState[Object.keys(finalState)[0]]).toBe(finalState[Object.keys(finalState)[0]])
// })
//
//
// test('remove task from tasklist', () => {
//     const taskId = startState[todolistId1][0].id
//     const finalState = tasksReducer(startState, deleteTask(todolistId1, taskId))
//
//     expect(finalState).not.toBe((startState))
// })
//
// test('add task to tasklist in todolist', () => {
//     const addTaskTitle = 'Hello'
//     const finalState = tasksReducer(startState, addTask(todolistId1, addTaskTitle))
//
//     expect(finalState[todolistId1].length).not.toBe((startState[todolistId1].length))
// })
//
// test('change task status in tasklist', () => {
//     const status = TaskStatuses.New
//     const taskId = startState[todolistId1][0].id
//     const finalState = tasksReducer(startState, updateStatusTask(todolistId1, taskId, status))
//
//     expect(finalState[todolistId1][0].status).toBe(0)
//     expect(finalState[todolistId2][0].status).toBe(2)
// })
//
// test('change task title in tasklist', () => {
//     const newTitle = 'GREAT'
//     const taskId = startState[todolistId1][0].id
//     const finalState = tasksReducer(startState, updateTitleTask(todolistId1, taskId, newTitle))
//
//     expect(finalState[todolistId1].length).toBe((startState[todolistId1].length))
// })
