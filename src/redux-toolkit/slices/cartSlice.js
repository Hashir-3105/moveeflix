import { createSlice } from '@reduxjs/toolkit';


const getInitialCart = () => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("cartItems");
        return saved ? JSON.parse(saved) : [];
    }
    return [];
};
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: getInitialCart(),
    },
    reducers: {
        addToCart: (state, action) => {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.quantity = 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
