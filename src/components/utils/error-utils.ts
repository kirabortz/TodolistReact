import {ResponseProps} from '../../api/todolist-api';
import {setAppError, setAppStatus} from '../../app/app-reducer';
import {AppDispatch} from "../../app/Store";


export const ServerAppErrorHandle = <T, >(data: ResponseProps<T>, dispatch: AppDispatch) => {
    data.messages.length
        ? dispatch(setAppError(data.messages[0]))
        : dispatch(setAppError('Some error occurred'))

    dispatch(setAppStatus('failed'))
}

export const ServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
    dispatch(setAppError(error.message))
    dispatch(setAppStatus('failed'))
}