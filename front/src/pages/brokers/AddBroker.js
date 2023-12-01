import React from 'react';
import './AddBroker.css';
import * as material from '@mui/material';

function AddBroker() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <material.Button id='AddBroker' sx={{borderRadius: 3}} variant='outlined' onClick={handleClickOpen}>
                Добавить брокера
            </material.Button>
            <material.Dialog open={open} onClose={handleClose}>
                <material.DialogTitle>Новый брокер</material.DialogTitle>
                <material.DialogContent>
                    <material.DialogContentText>
                        Введите имя, фамилию, логин и баланс брокера
                    </material.DialogContentText>
                    <material.TextField
                        autoFocus
                        margin='dense'
                        id='firstName'
                        label='Имя'
                        type='text'
                        fullWidth
                        />
                    <material.TextField
                        autoFocus
                        margin='dense'
                        id='lastName'
                        label='Фамилия'
                        type='text'
                        fullWidth
                        />
                    <material.TextField
                        autoFocus
                        margin='dense'
                        id='login'
                        label='Логин'
                        type='email'
                        fullWidth
                        />
                    <material.TextField
                        autoFocus
                        margin='dense'
                        id='balace'
                        label='Баланс'
                        type='number'
                        fullWidth
                        />
                </material.DialogContent>
                <material.DialogActions>
                    <material.Button onClick={handleClose}>Отмена</material.Button>
                    <material.Button onClick={handleClose}>Добавить</material.Button>
                </material.DialogActions>
            </material.Dialog>
        </React.Fragment>
    );
}

export default AddBroker;