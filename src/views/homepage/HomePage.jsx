import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";

export const HomePage = () => {
    const { userId } = JSON.parse(localStorage.getItem(`authData`)) || []
    useEffect(() => {
        document.title = `Главная`
    }, [])
    
    return(
        <>
            <div className="container home">
                <h1>Главная страница</h1>
                <Link to={`user/${userId}`}>Перейти на страницу пользователя</Link>
            </div>
        </>
    )
}