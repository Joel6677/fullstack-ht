import React, { createContext, useReducer } from "react";

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_OPEN":
            return { ...state, open: action.payload }; 
        case "SET_SHOW":
            return { ...state, show: action.payload};
        default:
            return { ...state };
    }
};


const initialState = {
    open: false,
    show: false
};

export const StateContext = createContext(initialState);

export const StateProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {props.children}
        </StateContext.Provider>
    );
};

