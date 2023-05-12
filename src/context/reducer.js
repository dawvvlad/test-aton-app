export const reducer = (state, { type, payload }) => {
    switch(type) {
        case "SET_IS_AUTH": 
            return {
                ...state,
                isAuth: payload
        };
        default: return state;
    }
}