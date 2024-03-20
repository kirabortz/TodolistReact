import React, {ChangeEvent, memo, useState} from 'react';

import TextField, {TextFieldVariants} from '@mui/material/TextField';
import {TaskStatuses} from '../../api/tasks-api';


type ToggleEditModeProps = {
    onChange: (title: string) => void
    title: string
    variant?: TextFieldVariants | undefined
    taskStatus?: number
    disabled?: boolean
}

export const ToggleEditMode = memo((props: ToggleEditModeProps) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const showEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const hideEditMode = (e: any) => {
        e.key === 'Enter' || e.type === 'blur'
        && (setEditMode(false), props.onChange(title))
    }
    const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <TextField style={{whiteSpace: 'pre-wrap'}}
                         variant="standard"
                         autoFocus
                         multiline
                         value={title}
                         onBlur={hideEditMode}
                         onKeyUp={hideEditMode}
                         onChange={updateTitleHandler}
            />
            : <TextField variant={props.variant || 'standard'}
                         style={{whiteSpace: 'pre-wrap'}}
                         inputProps={{ style: { color: (props.taskStatus === TaskStatuses.Completed ? '#00695f':'' )} }}
                         value={props.title}
                         multiline
                         onDoubleClick={showEditMode}
                         disabled={props.disabled}
            />
    );
})