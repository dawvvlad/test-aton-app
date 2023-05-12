import "./auth.css";
import { authUser } from "../../api";
import { useNavigate } from "react-router-dom"; 

// страница авторизации
const Auth = () => {
    const navigate = useNavigate();

    // submit функция
    const authorize = (e) => {
        e.preventDefault();
        const email = document.querySelector(`.email`);
        const pass = document.querySelector(`.pass`);


        // передает value из input и получает данные из API 
        authUser(email.value, pass.value).then(data => {
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
                navigate(`/user/${data.id}`)
            }

            // иначе - выводит сообщение, что данные введены некорректно
            else {
                    const root = document.querySelector(`#root`)
                    const errorMessage = document.createElement(`div`);
                    errorMessage.style.cssText = `width: 100%; position: absolute; min-height: 100vh; z-index: 1000`;
                    errorMessage.innerHTML = `<h1>НЕВЕРНЫЙ ПАРОЛЬ</h1>`;
                    
                    root.prepend(errorMessage)
                    setTimeout(() => root.removeChild(errorMessage), 3000)
            }
        })
    }

    return (
        <>
            <div className="container auth-page">
            <h1>Вы не авторизованы</h1>

                <form action="" onSubmit={authorize}>
                    <input className="email" type="email" placeholder="Ваш email"/>
                    <input className="pass" type="password" placeholder="Пароль"/>
                    <input type="submit" className="submit-btn"/>
                </form>
                <p onClick={() => console.log(`hi`)}>Забыли пароль?</p>
            </div>
        </>
    )
}

export { Auth }