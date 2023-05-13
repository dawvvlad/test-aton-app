import "./userpage.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserData, getResources } from "../../api";
import { ContextProvider } from "../../context/Context";
import { Preloader } from "../../components/preloader/Preloader";
import { PageNotFound } from "../pagenotfound/PageNotFound";
import { DataTable } from "../../components/data-table/DataTable"

export const UserPage = () => {
    let { id } = useParams();
    const [ isUser, setIsUser ] = useState(false)
    const { userId } = JSON.parse(localStorage.getItem(`authData`))
    const { userData, setUserData, isLoading, setIsLoading, setResources } = useContext(ContextProvider)

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
        getResources().then(data => {
            setResources(data.data)
            setIsLoading(false)
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
                <h1>{`${userData.first_name}'s Resources`}</h1>
                <DataTable isUser={isUser}/>
            </div>
            }
        </>
    )
}