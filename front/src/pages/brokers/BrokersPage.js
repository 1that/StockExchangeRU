import React from 'react';
import './BrokersPage.css';
import BrokersTable from './BrokersTable';
import AddBroker from './AddBroker';

function BrokersPage() {
    return (
        <div className='BrokersPage'>
            <h1>Брокеры</h1>
            <BrokersTable />
            <AddBroker />
        </div>
    );
}

export default BrokersPage;