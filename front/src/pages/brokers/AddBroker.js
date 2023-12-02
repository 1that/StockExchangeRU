import React from 'react';
import * as material from '@mui/material';
import { io } from 'socket.io-client';

const brokersSocket = io('http://localhost:443/brokers');

function AddBroker() {
    const [open, setOpen] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [balance, setBalance] = React.useState(0);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFirstName('');
        setLastName('');
        setLogin('');
        setBalance(0);
    };

    const addBroker = () => {
        brokersSocket.emit('createBroker', {
            firstName,
            lastName,
            login,
            balance
        });
        setOpen(false);
        setFirstName('');
        setLastName('');
        setLogin('');
        setBalance(0);
    };

    return (
        <React.Fragment>
            <material.Button id='AddBroker' sx={{borderRadius: 3, margin: 5}} variant='outlined' onClick={handleClickOpen}>
                Добавить брокера
            </material.Button>
            <material.Dialog open={open} onClose={handleClose}>
                <material.DialogTitle>Новый брокер</material.DialogTitle>
                <material.DialogContent>
                    <material.DialogContentText>
                        Введите имя, фамилию, логин и баланс брокера
                    </material.DialogContentText>
                    <material.TextField
                        margin='dense'
                        id='firstName'
                        label='Имя'
                        type='text'
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    <material.TextField
                        margin='dense'
                        id='lastName'
                        label='Фамилия'
                        type='text'
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    <material.TextField
                        margin='dense'
                        id='login'
                        label='Логин'
                        type='email'
                        fullWidth
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        />
                    <material.TextField
                        helperText={balance < 0 ? 'Баланс не может быть меньше 0' : ''}
                        margin='dense'
                        id='balace'
                        label='Баланс'
                        type='number'
                        fullWidth
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        inputProps={{ min: 0 }}
                        />
                </material.DialogContent>
                <material.DialogActions>
                    <material.Button variant='contained' onClick={handleClose}>Отмена</material.Button>
                    <material.Button
                        variant='contained'
                        onClick={addBroker}
                        disabled={!firstName || !lastName || !login || balance < 0}
                        >Добавить</material.Button>
                </material.DialogActions>
            </material.Dialog>
        </React.Fragment>
    );
}

export default AddBroker;