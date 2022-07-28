import {
    createSlice,
  } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
  

export const cartSlice = createSlice({
    name: "cart",
    initialState:{
      cartItems: [],
      cartTotalQuntity: 0,
      cartTotalAmount: 0,
    },
    reducers: {
      addToCart(state, action) {
        const itemIndex = state.cartItems.findIndex(
          (item) => item._id === action.payload._id
          );
          console.log(itemIndex)
        if (itemIndex >= 0) {
          state.cartItems[itemIndex].quantity += 1;
        } else {
          const tempProduct = { ...action.payload, quantity: 1 };
          state.cartItems.push(tempProduct);
        }
        // localStorage.setItem('cartItem', JSON.stringify(itemIndex))
      },
      removerFromCart(state, action) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );
        state.cartItems = nextCartItems;
  
        // toast.error(`${action.payload.title}  removed from cart`, {
        //    position: "bottom-left",
        //  });
        },
      clearCart(state, action){
        state.cartItems = [];
        // toast.error(`Cart Clear`, {
        //    position: "bottom-left",
        //  });
        },
      decreseCart(state, action) {
        const itemIndex = state.cartItems.findIndex(
          (cartItem) => cartItem._id === action.payload._id
        );
        console.log(itemIndex)
        if (state.cartItems[itemIndex] > 1) {
          state.cartItems[itemIndex] -= 1;
  
          toast.info(`Decreased ${action.payload.title} cart quantity`, {
            position: "bottom-left",
          });
        } else if (state.cartItems[itemIndex] === 1) {
          const nextCartItems = state.cartItems.filter(
            (cartItem) => cartItem._id !== action.payload._id
          );
  
          state.cartItems = nextCartItems;
          // toast.error(`${action.payload.title}  removed from cart`, {
          //   position: "bottom-left",
          //});
        }
      },
      getTotals(state,action){
        let {total, quantity} = state.cartItems.reduce(
          (cartTotal, cartItem) => {
            const {itemPrice, quantity} = cartItem;
            const itemTotal = itemPrice * quantity;
  
            cartTotal.total += itemTotal
            cartTotal.quantity += quantity
  
            return cartTotal;
          },
          {
            total: 0,
            quantity: 0,
          }
        );
        state.cartTotalQuntity = quantity;
        state.cartTotalAmount = total
      }
    },
  });

  export const { addToCart, decreseCart, removerFromCart, clearCart, getTotals } = cartSlice.actions;
  export default (cartSlice).reducer;