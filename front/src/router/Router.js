import React from 'react';
import './Router.css';

function Router() {
    return (
        <div className='NavigationBar'>
            <h1>Админ панель</h1>
            <nav>
                <a href='/brokers'>Брокеры</a>
                <a href='/trading'>Торговля</a>
                <a href='/stocks'>Акции</a>
            </nav>
        </div>
    );
}

export default Router;