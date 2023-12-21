import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import Cookies from "js-cookie";

export const GlobalContext = createContext("Initial Value");
// let data = {
//     user: undefined,
//     token: Cookies.get('token') || undefined
// };

const data = {
    cart: JSON.parse(localStorage.getItem("cartData")) || [],
};

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data);

    // useEffect(() => {
    //     Cookies.set('token', state.token)
    // }, [state.token])
    
    useEffect(() => {
        localStorage.setItem("cartData", JSON.stringify(stateCart.cart));
      }, [stateCart.cart]);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}