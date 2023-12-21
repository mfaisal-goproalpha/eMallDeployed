import React, { createContext, useReducer, useEffect } from "react";
import { reducer } from "./reducer";

export const CartGlobalContext = createContext("Initial Value");

// Load cart data from local storage if available, otherwise set it undefined.
const data = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
};

export default function CartContextProvider({ children }) {
  const [stateCart, dispatchCart] = useReducer(reducer, data);

  // Save cart data to local storage whenever the cart state changes.
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(stateCart.cart));
  }, [stateCart.cart]);
  

  return (
    <CartGlobalContext.Provider value={{ stateCart, dispatchCart }}>
      {children}
    </CartGlobalContext.Provider>
  );
}
