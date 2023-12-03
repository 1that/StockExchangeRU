import { createSlice } from '@reduxjs/toolkit';

export const tradeSlice = createSlice({
    name: 'tradingStocks',
    initialState: [],
    reducers: {
        addTradingStocks: (state, action) => {
            action.payload.forEach(item => {
                if (!state.some(stock => stock.id === item.id)) {
                    item.stock.forEach(stockItem => {
                        const dateParts = stockItem.Date.split('/');
                        stockItem.Date = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
                        stockItem.Open = stockItem.Open.replace('$', '');
                    });
                    state.push(item);
                }
            });
        },
        clearTradingStocks: state => { return []; }
    }
});

export const { addTradingStocks, clearTradingStocks } = tradeSlice.actions;
export const selectTradingStocks = state => state.tradingStocks;

export default tradeSlice.reducer;