import { Link, useNavigate } from "react-router-dom";
import "./header.css";

export const Header = () => {
    const { auth_token } = JSON.parse(localStorage.getItem(`authData`)) || []
    const navigate = useNavigate()

    function logOut() {
        localStorage.removeItem(`authData`);
        navigate(`/auth`)
    }

    return (
        <header className="header">
            <h1>logo</h1>
            { auth_token ? <button onClick={() => logOut()}>Выйти</button> : <Link to="/auth">Войти</Link> }
        </header>
    )
}