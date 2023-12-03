import { createSlice } from '@reduxjs/toolkit';

export const stocksSlice = createSlice({
    name: 'stocks',
    initialState: [],
    reducers: {
        addStock: (state, action) => {
            action.payload.stock.forEach(stockItem => {
                const dateParts = stockItem.Date.split('/');
                stockItem.Open = stockItem.Open.replace('$', '');
                stockItem.High = stockItem.High.replace('$', '');
                stockItem.Low = stockItem.Low.replace('$', '');
                stockItem.Last = stockItem.Last.replace('$', '');
                stockItem.Date = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
            });
            state.push(action.payload);
        }
    }
});

export const { addStock } = stocksSlice.actions;
export const selectStocks = state => state.stocks;

export default stocksSlice.reducer;