import { useContext, useEffect } from "react";
import "./auth.css";
import { authUser } from "../../api";
import { useNavigate } from "react-router-dom"; 
import { ContextProvider } from "../../context/Context";


const Auth = () => {
    const navigate = useNavigate();
    const { setIsAuth } = useContext(ContextProvider);

    // submit функция
    const authorize = (e) => {
        e.preventDefault();
        const email = document.querySelector(`.email`);
        const pass = document.querySelector(`.pass`);


        // передает value из input и получает данные из API 
        authUser(email.value, pass.value).then(data => {
            // если ОК - сохраняет токен пользователя в localStorage для сохранения статуса авторизации
            if(!data.ok) {
                // полученные из API данные
                const authHistory = {
                    id: data.id,
                    auth_token: data.token
                }
                localStorage.setItem(`authData`, JSON.stringify(authHistory));

                //изменяет состояние isAuth
                setIsAuth(true)
                // после успешной авторизации - редирект на страницу нужного пользователя
                navigate(`/user/${data.id}`)
            }
        })
    }

    useEffect(() => {
        
    },[])

    return (
        <>
            <div className="container auth-page">
            <h1>LOGIN PAGE</h1>

                <form action="" onSubmit={authorize}>
                    <input className="email" type="email" />
                    <input className="pass" type="password" />
                    <input type="submit" className="submit-btn"/>
                </form>
            </div>
        </>
    )
}

export { Auth }