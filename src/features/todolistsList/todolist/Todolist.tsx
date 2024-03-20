import React, {memo, useCallback, useEffect, useState} from 'react';

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import {AlertDialog} from '../../../components/materialUI/AlertDialog';
import Skeleton from '@mui/material/Skeleton';

import {
    deleteTodolistThunk,
    FilterValuesType,
    isEntityStatus,
    TodolistsDomainType,
    updateTodolistThunk,
} from '../todolists-reducer';

import {addTaskThunk, setTasksThunk, TasksDomainType,} from '../tasks-reducer';
import {TaskStatuses} from '../../../api/tasks-api';
import {ToggleEditMode} from '../../../components/toggleEditMode/ToggleEditMode';
import {AddItemForm} from '../../../components/addItemForm/AddItemForm';
import {useAppDispatch, useAppSelector} from '../../../app/Store';
import {Task} from './task/Task';
import {TodolistFilter} from './TodolistFilter';


export const Todolist = memo((props: TodolistsDomainType) => {
    const [todoBe, setTodoBe] = useState(true)
    const dispatch = useAppDispatch()

    let tasks: TasksDomainType[] = useAppSelector(state => state.tasksReducer[props.id]);

    useEffect(() => {
        dispatch(setTasksThunk(props.id))
    }, []);


    const updateFilterTodolistHandler = useCallback((filterName: FilterValuesType) => {
        dispatch(updateTodolistThunk(props.id, 'filter', filterName))
    }, [dispatch, props.id])

    const deleteTodolistHandler = useCallback(() => {
        setTodoBe(false)
        dispatch(isEntityStatus(props.id, 'loading'))
        setTimeout(() => dispatch(deleteTodolistThunk(props.id)), 1200);
    }, [dispatch, props.id])

    const updateTitleTodolistHandler = useCallback((title: string) => {
        dispatch(updateTodolistThunk(props.id, 'title', title))
    }, [dispatch, props.id])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskThunk(props.id, title))
    }, [dispatch, props.id])

    if (props.filter === 'active') {
        tasks = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const tasksMap = tasks.map(task =>
        props.entityStatus === 'loading'
            ? <Skeleton animation="wave" key={task.id}><Task task={task}/></Skeleton>
            : <Task key={task.id} task={task}/>
    )

    return (
        <div className={todoBe ? 'Todolist' : 'Todolist--delete'}>
            <h3>
                <Grid container alignItems="center">
                    <Grid item style={{marginRight: '10px'}}>
                        <IconButton className="deleteTodoCustomBtn">
                            <AlertDialog deleteTodolist={deleteTodolistHandler}/>
                        </IconButton>
                    </Grid>
                    <ToggleEditMode onChange={updateTitleTodolistHandler} title={props.title}
                    />
                </Grid>
            </h3>

            <AddItemForm placeholder="Enter new task"
                         addItemValue={addTaskHandler}
                         width="86%"
                         entityStatus={props.entityStatus === 'loading'}
            />
            <div>
                <Grid item padding={1}>
                    {tasksMap}
                </Grid>
            </div>
            <div>
                {props.entityStatus === 'loading'
                    ? <Skeleton animation="wave"><TodolistFilter filter={props.filter}
                                                                 updateTodolistFilter={updateFilterTodolistHandler}/>
                    </Skeleton>
                    : <TodolistFilter filter={props.filter} updateTodolistFilter={updateFilterTodolistHandler}/>}
            </div>
        </div>
    )
})
