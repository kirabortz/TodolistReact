import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {FilterValuesType} from '../todolists-reducer';
import {TaskStatuses} from '../../../api/tasks-api';

type TodolistFilterPropsType = {
    filter:FilterValuesType
    updateTodolistFilter:(filterName:FilterValuesType)=>void
}

export const TodolistFilter = React.memo(({filter,updateTodolistFilter}: TodolistFilterPropsType) => {
    return (
        <Grid container
              justifyContent="center"
              padding={3}>
            <Grid item padding={0.5}>
                <Button variant={filter === 'all' ? 'contained' : 'text'}
                        color={filter === 'all' ? 'secondary' : 'warning'}
                        onClick={() => updateTodolistFilter('all')}
                >
                    all</Button>
            </Grid>
            <Grid item padding={0.5}>
                <Button variant={filter === 'active' ? 'contained' : 'text'}
                        color={filter === 'active' ? 'secondary' : 'error'}
                        onClick={() => updateTodolistFilter('active')}
                >
                    active</Button>
            </Grid>
            <Grid item padding={0.5}>
                <Button variant={filter === 'completed' ? 'contained' : 'text'}
                        color={filter === 'completed' ? 'secondary' : 'success'}
                        onClick={() => updateTodolistFilter('completed')}
                >
                    completed</Button>
            </Grid>
        </Grid>
    );
})