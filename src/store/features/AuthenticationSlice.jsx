import { createSlice } from '@reduxjs/toolkit';

// Function to load state from local storage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('authentication');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

// Function to save state to local storage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('authentication', serializedState);
    } catch {
        // Ignore write errors
    }
};

// Load initial state from local storage or use default value
const initialState = loadState() || {
    userId: 0,
    name: '',
    jwtToken: '',
    accountType: '',
    ownerId: null,
    isAdmin: false
};

export const authenticationSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        registerUser: (state, action) => {
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.jwtToken = action.payload.jwtToken;
            state.accountType = action.payload.accountType;
            state.isAdmin = action.payload.isAdmin;
            state.ownerId = action.payload.ownerId;
            saveState(state); // Save state to local storage
        },
        logoutUser: (state) => {
            state.userId = 0;
            state.name = '';
            state.jwtToken = '';
            state.isAdmin = false;
            state.accountType = '';
            state.ownerId = null;
            saveState(state); // Save state to local storage
        },
    },
});

// Action creators are generated for each case reducer function
export const { registerUser, logoutUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;