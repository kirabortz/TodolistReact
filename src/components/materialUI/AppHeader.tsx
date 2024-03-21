import React, {memo, useEffect} from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box/Box';
import Menu from '@mui/icons-material/Menu';
import LinearProgress from '@mui/material/LinearProgress';

import {useAppDispatch, useAppSelector} from '../../app/Store';
import {RequestStatusType} from '../../app/app-reducer';
import {getAuth, login, logout} from '../../api/auth-reducer';
import {Navigate, useNavigate} from 'react-router-dom';

export const AppHeader = memo(() => {
    let status: RequestStatusType = useAppSelector(state => state.appReducer.status);
    let isLoggedIn = useAppSelector(state => state.authReducer.isLoggedIn)

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [])
    const LogoutHandler = () => {
        dispatch(logout())
    }

    return <Box sx={{flexGrow: 1}}>
        <AppBar position="static" color="secondary">
            <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}>
                    <Menu/>
                </IconButton>

                <Typography variant="h6"
                            component="div"
                            sx={{flexGrow: 1}}>
                    Todos
                </Typography>

                <Typography variant="h6"
                            component="div"
                            sx={{flexGrow: 1}}
                ><button className='ads-btn'>Your ads could be here</button>
                </Typography>

                {isLoggedIn && <Button color="inherit" onClick={LogoutHandler}>Logout</Button>}
            </Toolbar>
        </AppBar>
        {status === 'loading' && <LinearProgress color="secondary"/>}
    </Box>
});