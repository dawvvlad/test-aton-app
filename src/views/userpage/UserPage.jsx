import "./userpage.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserData } from "../../api";
import { ContextProvider } from "../../context/Context";
import { Preloader } from "../../components/preloader/Preloader";
import { PageNotFound } from "../pagenotfound/PageNotFound";
import { DataTable } from "../../components/data-table/DataTable"

export const UserPage = () => {
    // Берем информацию о конкретном пользователе
    let { id } = useParams();
    const [ isUser, setIsUser ] = useState(false)
    const { userId } = JSON.parse(localStorage.getItem(`authData`))
    const { userData, setUserData, isLoading, setIsLoading } = useContext(ContextProvider)

    useEffect(() => { 
        setIsLoading(true);
        let time = Date.now();

        getUserData(id).then(data => {
            setUserData(data.data);
            setIsLoading(false);

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

            if(data.data.id === userId) {
                setIsUser(true);
            } else {
                setIsUser(false)
            };
        })
    }, [id])

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

                <DataTable />
            </div>
            }
        </>
    )
}