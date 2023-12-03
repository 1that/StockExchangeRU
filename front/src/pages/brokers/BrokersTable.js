import React from 'react';
import './style/BrokersTable.css';
import * as material from '@mui/material';
import * as icon from '@mui/icons-material';
import { selectBrokers } from './slice/BrokerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { updateBrokerBalance } from './slice/BrokerSlice';
import { io } from 'socket.io-client';

const brokersSocket = io('http://localhost:443/brokers');

function BrokersTable() {
    const dispatch = useDispatch();
    const brokers = useSelector((state) => selectBrokers(state));
    const handleBalanceChange = (id, newBalance) => {
        dispatch(updateBrokerBalance({ id, newBalance }));
    };

    const saveClick = (id, balance) => {
        brokersSocket.emit('updateBalance', {id, balance});
    };

    const deleteClick = (id) => {
        brokersSocket.emit('deleteBroker', id);
    };

    return (
        <material.TableContainer component={material.Paper}  
        sx={{ minWidth: 400, width: 'auto', backgroundColor: '#5a5a5a' }}>
            <material.Table aria-label='brokers table'>
                <material.TableHead>
                    <material.TableRow>
                        <material.TableCell id='FirstName' sx={{ color: 'white'}}>Имя</material.TableCell>
                        <material.TableCell id='LastName' sx={{ color: 'white'}}>Фамилия</material.TableCell>
                        <material.TableCell id='Balance' align='center' sx={{ color: 'white'}}>Баланс</material.TableCell>
                        <material.TableCell align='center'></material.TableCell>
                    </material.TableRow>
                </material.TableHead>
                <material.TableBody>
                    {brokers.map(broker => 
                        <material.TableRow
                            key={broker.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <material.TableCell id='FirstName' sx={{ color: 'white'}} component='th' scope='row'>{broker.firstName}</material.TableCell>
                            <material.TableCell id='LastName' sx={{ color: 'white'}} component='th' scope='row'>{broker.lastName}</material.TableCell>
                            <material.TableCell id='Balance' sx={{ color: 'white'}} align='center'>
                                <material.TextField 
                                    margin='dense'
                                    id='balace'
                                    type='number'
                                    style={{ width: 150 }}
                                    InputProps={{
                                        style: {
                                            color: 'white',
                                        },
                                    }}
                                    value={broker.balance}
                                    onChange={(event) => handleBalanceChange(broker.id, event.target.value)}
                                />
                            </material.TableCell>
                            <material.TableCell align='left'>
                                <material.IconButton aria-label='save' id='Save' onClick={() => saveClick(broker.id, broker.balance)}>
                                    <icon.Save id='Icon' />
                                </material.IconButton>
                                <material.IconButton aria-label='delete' id='Delete' onClick={() => deleteClick(broker.id)}>
                                    <icon.Delete id='Icon' />
                                </material.IconButton>
                            </material.TableCell>
                        </material.TableRow>
                    )}
                </material.TableBody>
            </material.Table>
        </material.TableContainer>
    );
}

export default BrokersTable;