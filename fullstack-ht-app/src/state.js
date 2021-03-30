import React, { createContext, useReducer } from "react";

export const reducer = (state, action) => {
    console.log('action payload: ', action.payload, ' action: ', action);
    switch (action.type) {
        case "SET_OPEN":
            return { ...state, open: action.payload }; 
        case "SET_SHOW":
            return { ...state, show: action.payload };
        case "SET_SHOW_DISTILLATION_DATE":
            return { ...state, showDistillationDate: action.payload };
        case "SET_SHOW_BOTTLING_DATE":
            return { ...state, showBottlingDate: action.payload };
        case "SET_USERINFO":
            return { ...state, userinfo: action.payload};
        case "SET_AC_CHECKED":
            console.log('set ac chekced: ', state, ' action payload: ', action.payload);
            return { ...state, acChecked: action.payload};
        case "SET_CF_CHECKED":
            return { ...state, cfChecked: action.payload};
        default: 
            return { ...state };
    }
};


const initialState = {
    open: false,
    show: false,
    showDistillationDate: false,
    showBottlingDate: false,
    acChecked: false,
    cfChecked: false,
    userinfo: []
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

