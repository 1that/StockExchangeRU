import { createSlice } from '@reduxjs/toolkit';

export const brokersSlice = createSlice({
    name: 'brokers',
    initialState: [],
    reducers: {
        addBroker: (state, action) => {
            state.push(action.payload);
        },
        deleteBroker: (state, action) => {
            const index = state.findIndex(broker => broker.id === action.payload.id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        updateBrokerBalance: (state, action) => {
            const { id, newBalance } = action.payload;
            const brokerIndex = state.findIndex(broker => broker.id === id);
            if (brokerIndex !== -1) {
                state[brokerIndex] = { ...state[brokerIndex], balance: newBalance };
            }
        }
    }
});

export const { addBroker, deleteBroker, updateBrokerBalance } = brokersSlice.actions;
export const selectBrokers = state => state.brokers;

export default brokersSlice.reducer;