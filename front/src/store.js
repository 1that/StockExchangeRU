import { configureStore } from '@reduxjs/toolkit';
import brokersReducer from './pages/brokers/slice/BrokerSlice';
import stocksReducer from './pages/stocks/slice/StockSlice';

const store = configureStore({
    reducer: {
        stocks: stocksReducer,
        brokers: brokersReducer
    }
});

export default store;