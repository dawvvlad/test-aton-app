import "./auth.css";
import { authUser } from "../../api";
import { Link, Outlet, useNavigate } from "react-router-dom"; 
import { useContext } from "react";
import { ContextProvider } from "../../context/Context";
import { Preloader } from "../../components/preloader/Preloader"
import { toast } from 'react-toastify'

// страница авторизации
const Auth = () => {
    const navigate = useNavigate();
    const { isLoading, setIsLoading } = useContext(ContextProvider)
    
    // submit функция
    const authorize = (e) => {
        e.preventDefault();
        const email = document.querySelector(`.email`);
        const pass = document.querySelector(`.pass`);

        // передает value из input и получает данные из API 
        authUser(email.value, pass.value).then(data => {
            setIsLoading(true) // загрузка страницы

            // если ОК - сохраняет токен пользователя в localStorage для сохранения статуса авторизации
            if(!data.error) {
                // полученные из API данные
                const authHistory = {
                    userId: data.id,
                    auth_token: data.token
                }
                // сохраняет token и id в localStorage
                localStorage.setItem(`authData`, JSON.stringify(authHistory));


                // после успешной авторизации - редирект на страницу нужного пользователя

                toast('Вход выполнен', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });

                navigate(`/user/${data.id}`);

                setIsLoading(false) // загрузка страницы прекращена
            }

            // иначе - выводит сообщение, что данные введены некорректно
            else {
                toast.error('Неверный логин', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    setIsLoading(false)
            }
        })
    }

    return (
        <>
            { isLoading ? <Preloader /> :
            <>
                <div className="container auth-page">
                    <h1>Вы не авторизованы</h1>
                    <form action="" onSubmit={authorize}>
                        <input className="email" type="email" placeholder="Ваш email"/>
                        <input className="pass" type="password" placeholder="Пароль"/>
                        <input type="submit" className="submit-btn" value="Войти"/>
                    </form>
                    <Link to="respas">Забыли пароль?</Link>
                </div>
                
                <Outlet />
            </>
            }  
        </>
    )
}

export { Auth }