import { useReducer, createContext } from "react"
import { reducer } from "./reducer"
export const ContextProvider = createContext()

const initialValue = {
    userData: [],
    resources: [],
    isLoading: false
}

export const Context = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, initialValue);
    
    state.setUserData = (data) => {
        dispatch({ type: "SET_USER_DATA", payload: data })
    }

    state.setIsLoading = (value) => {
        dispatch({ type: "SET_IS_LOADING", payload: value })
    }

    state.setResources = (data) => {
        dispatch({ type: "SET_RESOURCES", payload: data })
    }

    return (
        <ContextProvider.Provider value={state}>
            { children }
        </ContextProvider.Provider >
    )
}