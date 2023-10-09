import { createSlice } from "@reduxjs/toolkit";

// Step 1: Start Redux with creating initial State
const initialState = {
  cart: [],
};

// Step 2: CreateSlice
//  - name
//  - initialState
//  - reducers
// ## IDEA ## -> On Reducers we have to think what operation need for the cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = ID of the item

      // If the pizza Id is similar to the ID that send from the payload
      // Then filter method will remove the ID from the cart array
      // state.cart will be updated
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      // Once get the object which payloadId === pizzaId, then we can mutate the array
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      // Once get the object which payloadId === pizzaId, then we can mutate the array
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state, action) {
      // Make the cart to the initial state
      state.cart = [];
    },
  },
});

// Step 3: Grap The 5 Action Creators or 5 Reducers
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

// Step 4: Need to export default cartSlice Reducer
export default cartSlice.reducer;

// Redux Selector Function

// Get cart
export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
