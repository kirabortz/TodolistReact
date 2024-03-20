import {ResponseProps} from '../../api/todolist-api';
import {setAppError, setAppStatus} from '../../app/app-reducer';


export const ServerAppErrorHandle = <T, >(data: ResponseProps<T>, dispatch: any) => {
    data.messages.length
        ? dispatch(setAppError(data.messages[0]))
        : dispatch(setAppError('Some error occurred'))

    dispatch(setAppStatus('failed'))
}

export const ServerNetworkError = (error: { message: string }, dispatch: any) => {
    dispatch(setAppError(error.message))
    dispatch(setAppStatus('failed'))
}