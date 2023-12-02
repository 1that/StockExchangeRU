import React from 'react';
import './style/BrokersPage.css';
import BrokersTable from './BrokersTable';
import AddBroker from './AddBroker';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addBroker, deleteBroker } from './slice/BrokerSlice';

const brokersSocket = io('http://localhost:443/brokers');

function BrokersPage() {
    const dispatch = useDispatch();

    brokersSocket.emit('findAllBroker', addBrokersList);
    
    brokersSocket.on('create', (broker) => {
        dispatch(addBroker(broker));
    });

    brokersSocket.on('delete', (broker) => {
        console.log(broker);
        dispatch(deleteBroker(broker));
    });

    function addBrokersList(brokers) {
        brokers.forEach(broker => {
            dispatch(addBroker(broker));
        });
    }

    return (
        <div className='BrokersPage'>
            <h1>Брокеры</h1>
            <BrokersTable />
            <AddBroker />
        </div>
    );
}

export default BrokersPage;