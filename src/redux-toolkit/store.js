import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice';
import historyReducer from './slices/historyDetailSlice'
import filterReducer from './slices/filterSlice'
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        history : historyReducer,
        filters : filterReducer,
    },
})
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("cartItems", JSON.stringify(state.cart.items));
    localStorage.setItem("bookingHistory", JSON.stringify(state.history.items));
});