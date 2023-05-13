import "./userpage.css";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserData, getResources, getAllUsers } from "../../api";
import { ContextProvider } from "../../context/Context";
import { Preloader } from "../../components/preloader/Preloader";
import { PageNotFound } from "../pagenotfound/PageNotFound";
import { DataTable } from "../../components/data-table/DataTable"

export const UserPage = () => {
    let { id } = useParams();
    const [ isUser, setIsUser ] = useState(false)
    const { userId } = JSON.parse(localStorage.getItem(`authData`))
    const { userData, setUserData, isLoading, setIsLoading, setResources, resources } = useContext(ContextProvider)
    const [ totalPages, setTotalPages ] = useState(1)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ otherUsers, setOtherUsers ] = useState([])

    useEffect(() => { 
        setIsLoading(true);
        let time = Date.now();

        getUserData(id).then(data => {
            setUserData(data.data);

            // оповещение о получении данных
            toast.info(`Данные получены за ${((Date.now() - time) / 1000).toFixed(1)} сек.`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            
            // проверка, является ли страница пользователя страницей авторизованного пользователя
            if(data.data.id === userId) {
                setIsUser(true);
            } else {
                setIsUser(false)
            };
        });

        // получение ресурсов из API
        getResources(1).then(data => {
            setResources(data.data);
            setIsLoading(false);

            setTotalPages(data.total_pages)
        });
        
        getAllUsers().then(data => {
            setOtherUsers(data.data)
        })

    }, [id])


    // блокировка 
    if(Number(id) > 12) {
        return <PageNotFound></PageNotFound>
    }

    return (
        <>
            { isLoading || !userData ? <Preloader /> : 
                <div className="container">
                 <div className="user-info">
                    <img src={userData.avatar} alt="" />
                    <div className="user-info title">
                        <h1>{userData.first_name} {userData.last_name}</h1>
                        <a className="mail__link" href={`mailto:${userData.email}`}>{userData.email}</a>
                    </div>
                </div>
                <div className="users-resources">
                    <h3>{`${userData.first_name}'s Resources`}</h3>
                    { isUser ? <Link to="push">Добавить</Link> : ``}
                </div>
                <DataTable isUser={isUser} 
                        totalPages={totalPages} 
                        setPages={setTotalPages} 
                        currentPage={currentPage} 
                        setCurrentPage={setCurrentPage}/>
                
                <div>
                    <h1>Другие пользователи</h1>
                    {  }
                </div>
            </div>
            }

            <Outlet />
        </>
    )
}