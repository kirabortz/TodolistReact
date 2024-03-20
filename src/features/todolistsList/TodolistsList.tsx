import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import React, {useCallback, useEffect, useState} from 'react';

import {store, useAppDispatch, useAppSelector} from '../../app/Store';

import {Paginate} from '../../components/paginate/Paginate';
import {AddItemForm} from '../../components/addItemForm/AddItemForm';
import {Pagination} from '../../components/paginate/Pagination';
import {Todolist} from './todolist/Todolist';
import {addTodolistThunk, getTodolistThunk, TodolistsDomainType} from './todolists-reducer';
import {Navigate, useNavigate} from 'react-router-dom';


export const TodolistsList = () => {
    const dispatch = useAppDispatch()

    let todolists: TodolistsDomainType[] = useAppSelector(() => store.getState().todolistsReducer);
    let isLoggedIn = useAppSelector(state => state.authReducer.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(getTodolistThunk)
    }, [])

    const [currentPage, setCurrentPage] = useState<number>(1);

    const pageSize = 4

    const changePageHandler = useCallback((page: number) => setCurrentPage(page), [currentPage])

    const addTodolistHandler = useCallback((title: string) => dispatch(addTodolistThunk(title)), [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////

    const todolistsCrop = (Paginate(todolists, currentPage, pageSize)).map((todolist: any) => {
        return <Grid item key={todolist.id}>
            <Paper style={{padding: '10px'}} elevation={5}>
                <Todolist {...todolist}/>
            </Paper>
        </Grid>
    })

    return (
        <>
            <Grid container
                  style={{padding: '20px 0'}}
                  justifyContent="center">
                <Pagination itemsLength={todolists.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            changePage={changePageHandler}
                />
                <AddItemForm placeholder="Enter new Todolist name"
                             addItemValue={addTodolistHandler}
                             width="50%"/>
            </Grid>
            <Grid container
                  spacing={3}
                  justifyContent="center"
            >
                {todolistsCrop}
            </Grid>
        </>)
}

