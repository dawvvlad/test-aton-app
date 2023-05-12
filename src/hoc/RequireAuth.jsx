import { Navigate } from "react-router-dom"

// hoc редирект
export const RequireAuth = ({children}) => {
    const { auth_token } = JSON.parse(localStorage.getItem(`authData`)) || []

    // если token пользователя отсутствует - редирект на страницу авторизации
    if(!auth_token) {
        return <Navigate to='/auth'/>
    }

    return children
}