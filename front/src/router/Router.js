import React from 'react';
import './Router.css';

function Router() {
    return (
        <div className='NavigationBar'>
            <h1>Админ панель</h1>
            <nav>
                <a href='/brokers'>Брокеры</a>
                <a href='/trading'>Трейдинг</a>
                <a href='/stoks'>Настройки</a>
            </nav>
        </div>
    );
}

export default Router;