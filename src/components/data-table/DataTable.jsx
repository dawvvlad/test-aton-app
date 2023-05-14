import { useContext, useEffect } from "react";
import "./data-table.css";
import { ContextProvider } from "../../context/Context";
import { getResources } from "../../api";
import { Link } from "react-router-dom";
import { Preloader } from "../preloader/Preloader";
import { toast } from "react-toastify";

export const DataTable = (props) => {
    const { isUser, totalPages, currentPage, setCurrentPage, setTotalPages, id } = props;

    // состояние объектов таблицы, состояние загрузки
    const { resources, setResources, isLoading } = useContext(ContextProvider);
    const res = JSON.parse(localStorage.getItem(`resources`)) || [];


    // пагинация
    function nextPage() {
        if(isUser) {
            setResources(res.slice(res.length / 2, res.length));
            setCurrentPage(currentPage + 1)
        } else {
            getResources(currentPage + 1).then(data => {
                setCurrentPage(data.page);
                setResources(data.data);
            })
        }
    }

    function prevPage () {
        if(isUser) {
            setResources(res.slice(0, res.length / 2));
            setCurrentPage(currentPage - 1)
        } else {
            getResources(currentPage - 1).then(data => {
                setCurrentPage(data.page);
                setResources(data.data);
            })
        }
    }

    useEffect(() => {
        // получение ресурсов из API
        if(isUser) {
            getResources(currentPage).then(data => {
                setResources(res.slice(0, res.length / 2));
                setTotalPages(data.total_pages);
                
                // оповещение о получении данных
            toast.info(`Данные получены`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            });
        }

        // если страница юзера - НЕ страница авторизованного юзера, меняем его объекты
        if(!isUser) {
            getResources(currentPage).then(data => {
                setResources(data.data);
                setTotalPages(data.total_pages);
            });
        }
    }, [id])

    return (
        <>
            <div className="data-table">
                <div className="data-table__header">
                    <h3>id</h3>
                    <h3>name</h3>
                    <h3>year</h3>
                    <h3>color</h3>
                    { isUser ? <h3>*</h3> : ``}
                </div>
                { !isLoading ? resources.map(e => {
                    return <div key={e.id} className="data-table__body">
                                <p>{e.id}</p>
                                <p>{e.name}</p>
                                <p>{e.year}</p>
                                <p style={{ backgroundColor: `${e.color}` }}></p>
                                { isUser ? <p><Link to={`edit/${e.id}`}>Изменить</Link></p> : ``}
                            </div>
                            
                }) : <Preloader /> }
            </div>

            { totalPages > currentPage ? <button className="change-btn" onClick={() => nextPage()}>Next</button> : ``}
            { totalPages === currentPage ? <button className="change-btn" onClick={() => prevPage()}>Prev</button> : ``}
        </>
        
    )
}