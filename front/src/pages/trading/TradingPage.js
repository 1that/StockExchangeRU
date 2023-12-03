import React from 'react';
import './style/TradingPage.css';
import SettingTrade from './TradeSettings';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addTradingStocks, clearTradingStocks } from './slice/TradeSlice';

const stocksSocket = io('http://localhost:443/stocks');

function TradingPage() {
    const dispatch = useDispatch();
    
    stocksSocket.on('currentStocksSelection', (stocks) => {
        console.log(stocks);
        dispatch(clearTradingStocks());
        dispatch(addTradingStocks(stocks));
    })

    return (
        <div className='TradingPage'>
            <h1>Торговля</h1>
            <SettingTrade />
        </div>
    );
}

export default TradingPage;