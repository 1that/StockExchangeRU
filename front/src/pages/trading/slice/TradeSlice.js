import { createSlice } from '@reduxjs/toolkit';

export const tradeSlice = createSlice({
    name: 'tradingStocks',
    initialState: [],
    reducers: {
        addTradingStocks: (state, action) => {
            action.payload.forEach(item => {
                if (!state.some(stock => stock.id === item.id)) {
                    state.push(item);
                }
            });
        },
        addTradingStocksInfo: (state, action) => {
            action.payload.forEach(item => {
                const stock = state.find(stock => stock.id === item.id);
                if (stock) {
                    stock.data = item.data;
                }
            });
        },
        clearTradingStocks: (state, action) => {
            const ids = action.payload.map(payloadStock => payloadStock.id);
            for (let i = state.length - 1; i >= 0; i--) {
                if (!ids.includes(state[i].id)) {
                    state.splice(i, 1);
                }
            }
        }
    }
});

export const { addTradingStocks, clearTradingStocks, addTradingStocksInfo } = tradeSlice.actions;
export const selectTradingStocks = state => state.tradingStocks;

export default tradeSlice.reducer;