import { createSlice } from '@reduxjs/toolkit';

const getInitialHistory = () => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('bookingHistory');
        return saved ? JSON.parse(saved) : [];
    }
    return [];
};

const historyDetailSlice = createSlice({
    name: 'history',
    initialState: {
        items: getInitialHistory(),
    },
    reducers: {
        saveToHistory: (state, action) => {
            state.items.push(...action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem("bookingHistory", JSON.stringify(state.items));
            }
        },
        clearHistory: (state) => {
            state.items = [];
            localStorage.removeItem("bookingHistory");
        }
    },
});

export const { saveToHistory, clearHistory } = historyDetailSlice.actions;
export default historyDetailSlice.reducer;
