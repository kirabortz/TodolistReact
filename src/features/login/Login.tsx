import React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useFormik} from 'formik';
import {login} from '../../api/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../app/Store';
import {Navigate} from "react-router-dom";

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = React.memo(() => {
    const dispatch = useAppDispatch()
    let isLoggedIn = useAppSelector(state => state.authReducer.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        }, validate: values => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required field'
            } else if (values.password.length < 6) {
                errors.password = '*Password must be 6 characters long.';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(login(values))
            formik.resetForm()
        },
    })
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                       {...formik.getFieldProps('email')}
                            />

                            {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password && formik.touched.password
                                ? <div>{formik.errors.password}</div>
                                : null
                            }
                            <FormControlLabel label={'Remember me'}
                                              control={<Checkbox
                                                  checked={formik.values.rememberMe}
                                                  {...formik.getFieldProps('rememberMe')}
                                              />}
                                              {...formik.getFieldProps('rememberMe')}
                            />
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
})