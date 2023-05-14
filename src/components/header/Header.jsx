import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { memo, useEffect, useState } from "react";
import { getUserData } from "../../api";
import { toast } from "react-toastify";

export const Header = memo(function Header() {
    const { userId, auth_token } = JSON.parse(localStorage.getItem(`authData`)) || []
    const navigate = useNavigate()
    const [ currentUser, setCurrentUser ] = useState([])

    // функция деавторизации пользователя
    function logOut() {
        localStorage.removeItem(`authData`);
        localStorage.removeItem(`resources`);

        // уведомление
        toast('Вы вышли', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

        navigate(`/auth`)
    }

    // получение данных об авторизованном пользователе для отрисовки ссылки на его страницу в header
    useEffect(() => {
        getUserData(userId).then(data => {
            setCurrentUser(data.data)
        })
    }, [])

    return (
        <header className="header">
            <Link to="/"><h1>logo</h1></Link>
            { auth_token && currentUser ? <Link to={`user/${userId}`} className="user-data">
                <img className="avatar" src={currentUser.avatar} alt="" />
                <p>{currentUser.first_name}</p>
            </Link> : ``}
            { auth_token ? <button className="log-out__btn" onClick={() => logOut()}>Выйти</button> : <Link className="log-out__btn" to="/auth">Войти</Link> }
        </header>
    )
})