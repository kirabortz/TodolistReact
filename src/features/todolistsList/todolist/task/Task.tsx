import React, {ChangeEvent, memo, useCallback} from 'react';

import Checkbox from '@mui/material/Checkbox';
import PanoramaFishEye from '@mui/icons-material/PanoramaFishEye';
import TaskAlt from '@mui/icons-material/TaskAlt';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';

import {deleteTaskThunk, TasksDomainType, toggleEntityStatus, updateTaskThunk} from '../../tasks-reducer';
import {TaskStatuses} from '../../../../api/tasks-api';
import {ToggleEditMode} from '../../../../components/toggleEditMode/ToggleEditMode';
import {useAppDispatch} from '../../../../app/Store';



export const Task = memo((props: TasksDomainPropsType) => {
    const dispatch = useAppDispatch()

    const deleteTaskHandler = useCallback(() => {
        dispatch(deleteTaskThunk(props.task.todoListId, props.task.id))
    }, [props.task.todoListId, props.task.id])

    const updateStatusTaskHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskThunk(props.task.todoListId, props.task.id, 'status', e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
    }, [props.task.todoListId, props.task.id])

    const updateTitleTaskHandler = useCallback((title: string) => {
        dispatch(updateTaskThunk(props.task.todoListId, props.task.id, 'title', title))
    }, [props.task.todoListId, props.task.id])



const isDisabledTask = props.task.entityStatus === 'loading'
    return <div key={props.task.id}>
        <Checkbox icon={<PanoramaFishEye/>}
                  checkedIcon={<TaskAlt/>}
                  color={props.task.status === TaskStatuses.Completed ? 'success' : 'primary'}
                  onChange={updateStatusTaskHandler}
                  checked={props.task.status === TaskStatuses.Completed}
                  disabled={isDisabledTask}
        />
        <ToggleEditMode title={props.task.title}
                        taskStatus={props.task.status}
                        onChange={updateTitleTaskHandler}
                        disabled={isDisabledTask}
        />
        <IconButton className="deleteTaskCustomBtn"
                    onClick={deleteTaskHandler}
                    disabled={isDisabledTask}

        >
            <Delete/>
        </IconButton>
    </div>
})

//TYPES
export type TasksDomainPropsType = {
    task: TasksDomainType
}