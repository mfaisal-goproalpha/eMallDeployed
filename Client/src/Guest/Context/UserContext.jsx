import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";


export const GlobalContext = createContext("Initial Value");
const data = {
    user: localStorage.getItem("user")
};

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data);

    useEffect(() => {
        localStorage.setItem('user', state.user)
    }, [state.user])

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}