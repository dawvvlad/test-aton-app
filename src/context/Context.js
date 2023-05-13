import { useReducer, createContext } from "react"
import { reducer } from "./reducer"
export const ContextProvider = createContext()

const initialValue = {
    userData: [],
    resource: [],
    token: ``,
    isLoading: false
}

export const Context = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, initialValue);
    
    state.setIsAuth = (value) => {
        dispatch({ type: "SET_IS_AUTH", payload: value })
    }
    
    state.setUserData = (data) => {
        dispatch({ type: "SET_USER_DATA", payload: data })
    }

    state.setIsLoading = (value) => {
        dispatch({ type: "SET_IS_LOADING", payload: value })
    }

    return (
        <ContextProvider.Provider value={state}>
            { children }
        </ContextProvider.Provider >
    )
}