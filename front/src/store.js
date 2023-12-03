import { configureStore } from '@reduxjs/toolkit';
import brokersReducer from './pages/brokers/slice/BrokerSlice';
import stocksReducer from './pages/stocks/slice/StockSlice';
import tradeReducer from './pages/trading/slice/TradeSlice';

const store = configureStore({
    reducer: {
        stocks: stocksReducer,
        brokers: brokersReducer,
        tradingStocks: tradeReducer
    }
});

export default store;