import React from 'react';
import './style/StocksPage.css';
import StocksGrid from './StocksGrid';
import { useDispatch } from 'react-redux';
import { addStock } from './slice/StockSlice';

function StoksPage() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:443/stocks');
            const data = await response.json();
            data.forEach(element => {
                dispatch(addStock(element));
            });
        }
        getData();
    }, [dispatch]);

    return (
        <div className='StocksPage'>
            <h1>Акции</h1>
            <StocksGrid />
        </div>
    );
}

export default StoksPage;