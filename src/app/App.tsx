import React, {useEffect} from 'react';
import './App.css';

import Container from '@mui/material/Container';
import {AppHeader} from '../components/materialUI/AppHeader';
import CircularProgress from '@mui/material/CircularProgress';
import {ErrorSnackBar} from '../components/materialUI/ErrorSnackBar';

import {TodolistsList} from '../features/todolistsList/TodolistsList';

import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/login/Login';
import {useAppDispatch, useAppSelector} from './Store';
import {initializeApp} from "./app-reducer";
import {UnknownPage} from "../components/materialUI/UnknownPage";



const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.appReducer.isInitialized)

    useEffect(()=>{
        dispatch(initializeApp())
    },[])

    if (!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <CircularProgress />
            </div>
        )
    }
    return (
        <div className="App">
            <ErrorSnackBar />
            <AppHeader/>
            <Container fixed style={{ maxWidth: '100%'}} >
                <Routes>
                    <Route path="/404" element={<UnknownPage/>} />
                    <Route path="*" element={<Navigate to={'/404'}/>} />

                    <Route path="/" element={<TodolistsList />}/>
                    <Route path="/login" element={<Login />}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
