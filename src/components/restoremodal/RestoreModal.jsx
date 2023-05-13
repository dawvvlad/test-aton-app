import { useEffect, useState } from "react"
import { getAllUsers } from "../../api"
import "./restoremodal.css"
import { useNavigate } from "react-router-dom"
import { Preloader } from "../preloader/Preloader"

// мдальное окно с подсказкой о возможных логинах, предоставлямых API
export const RestoreModal = () => {
    const navigate = useNavigate()
    const [ logins, setLogins ] = useState([])

    // получение доступных логинов из API постранично
    const getAllLogins = () => {
        Promise.all([getAllUsers(1), getAllUsers(2)]).then((data) => {
            const [p1, p2] = data;
            setLogins([...p1.data, ...p2.data])
        })
    }

    // запись всех логинов
    useEffect(() => {
        getAllLogins()
    }, [])

    return (
        <div className="container modal">
            <div className="modal-window">
                <span onClick={() => navigate(-1)}>✕</span>
                <div className="modal-window-logins">
                    <h2>доступные логины:</h2>
                    <p> (пароль может быть любым) </p>
                    { logins.length ? logins.map(e => {
                        return <li>{e.email}</li>
                    }) : <Preloader />}
                </div>
            </div>
        </div>
    )
}