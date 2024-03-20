import React, {useCallback} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelPresentation from '@mui/icons-material/CancelPresentation';
import {useAppDispatch} from '../../app/Store';
import {Simulate} from 'react-dom/test-utils';
import keyUp = Simulate.keyUp;

type AlertDialogProps = {
    deleteTodolist: () => void
}
export const AlertDialog = React.memo((props: AlertDialogProps) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch()

    const showAlertDialogHandler = useCallback(() => setOpen(true), [])


        const hideAlertDialogHandler = useCallback((e:any) => {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        }, []);


    const deleteTodolistHandler = useCallback(() => {

        props.deleteTodolist();
        setOpen(false)
    }, [])

    return (
        <React.Fragment>
            <CancelPresentation color="info"
                                className="deleteTodoCustomBtn"
                                onClick={showAlertDialogHandler}/>
            <Dialog open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title"
                             style={{
                                 fontSize: '25px',
                                 fontWeight: 'bold',
                                 textAlign: 'center'
                             }}>
                    Are you sure want to delete this todolist?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"
                                       style={{
                                           marginBottom: '20px',
                                           fontSize: '18px',
                                           fontWeight: 'bold',
                                           textAlign: 'center'
                                       }}>
                        Deletion, will result in the complete loss of all to-dos in the list.
                    </DialogContentText>
                    <DialogContentText className="deleteTodoCustomBtn--warning"
                                       style={{
                                           fontSize: '25px',
                                           fontWeight: 'bold',
                                           textAlign: 'center'
                                       }}
                    >This action cannot be undone!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteTodolistHandler}
                            autoFocus
                            className="deleteTodoCustomBtn--alert"
                    >
                        DELETE
                    </Button>
                    <Button onClick={hideAlertDialogHandler}
                    onKeyUp={hideAlertDialogHandler}>
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
})