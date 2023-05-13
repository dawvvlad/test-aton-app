export const reducer = (state, { type, payload }) => {
    switch(type) {
        case "SET_IS_AUTH": 
            return {
                ...state,
                isAuth: payload
        };
        case "SET_USER_DATA":
            return {
                ...state,
                userData: payload
            }

        case "SET_IS_LOADING":
            return {
                ...state,
                isLoading: payload
            }
        default: return state;
    }
}