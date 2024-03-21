import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Send from '@mui/icons-material/Send';
import {RequestStatusType} from '../../app/app-reducer';

export type AddItemFormProps = {
    entityStatus?:boolean
    addItemValue: (title: string) => void
    placeholder?: string
    width?: string
}

export const AddItemForm = memo((props: AddItemFormProps) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)


    const addTaskHandler = useCallback(() => {
        title.trim() !== ''
            ? (props.addItemValue(title.trim()), setTitle(''))
            : setError(null)
    }, [props.addItemValue, title])

    const changeItemValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        error !== null && setError(null)

        e.currentTarget.value === ' '
            ? setTitle('')
            : setTitle(e.currentTarget.value)
    }, [error])

    const onKeyUpHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && title.length >= 1
            ? addTaskHandler()
            : title.length < 1 && setError('Title not be empty')
    }, [title])

    const onBlurHandler = useCallback(() => setError(null), [])


    return (
        <Grid container
              alignItems="center"
              justifyContent="center">
            <TextField style={{width: props.width}}
                       variant="outlined"
                       label={props.placeholder}
                       helperText={error}
                       error={!!error}
                       value={title}
                       multiline
                       onChange={changeItemValueHandler}
                       onKeyUp={onKeyUpHandler}
                       onBlur={onBlurHandler}

            />
            <IconButton color="info"
                        onClick={addTaskHandler}
                        className="addItemCustomBtn"
                        disabled={title.length < 1 || props.entityStatus}
            >
                <Send/>
            </IconButton>
        </Grid>
    );
});