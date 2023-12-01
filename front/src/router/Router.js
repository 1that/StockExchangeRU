import React from 'react';
import './Router.css';

function Router() {
    return (
        <div className='NavigationBar'>
            <h1>Админ панель</h1>
            <nav>
                <a href='/brokers'>Brokers</a>
                <a href='/trading'>Trading</a>
                <a href='/stoks'>Stoks</a>
            </nav>
        </div>
    );
}

export default Router;