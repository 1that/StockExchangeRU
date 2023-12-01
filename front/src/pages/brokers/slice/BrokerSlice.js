import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     id: 0,
//     firstName: '',
//     lastName: '',
//     login: '',
//     balance: 0 
// };

export const brokersSlice = createSlice({
    name: 'brokers',
    initialState: [],
    reducers: {
        addBroker: (state, action) => {
            state.push(action.payload);
            // state.id = action.payload.id;
            // state.firstName = action.payload.firstName;
            // state.lastName = action.payload.lastName;
            // state.login = action.payload.login;
            // state.balance = action.payload.balance;
        },
        deleteBroker: (state) => {
            state.filter(broker => broker.id !== action.payload);
            // state.id = 0;
            // state.firstName = '';
            // state.lastName = '';
            // state.login = '';
            // state.balance = 0;
        }
    }
});

export const { addBroker } = brokersSlice.actions;

export default brokersSlice.reducer;