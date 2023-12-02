import { configureStore } from '@reduxjs/toolkit';
import brokersReducer from './pages/brokers/slice/BrokerSlice';

const store = configureStore({
    reducer: {
        brokers: brokersReducer
    }
});

export default store;