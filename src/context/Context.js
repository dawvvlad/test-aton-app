import { useReducer, createContext } from "react"
import { reducer } from "./reducer"
export const ContextProvider = createContext()

const initialValue = {
    isAuth: false,
    userData: [],
    products: [],
    token: ``
}

export const Context = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, initialValue);
    
    state.setIsAuth = (value) => {
        dispatch({ type: "SET_IS_AUTH", payload: value })
    }

    return (
        <ContextProvider.Provider value={state}>
            { children }
        </ContextProvider.Provider >
    )
}