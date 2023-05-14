import "./userpage.css";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { getUserData, getAllUsers } from "../../api";
import { ContextProvider } from "../../context/Context";
import { Preloader } from "../../components/preloader/Preloader";
import { PageNotFound } from "../pagenotfound/PageNotFound";
import { DataTable } from "../../components/data-table/DataTable"

export const UserPage = () => {
    // id юзера из адресной строки
    let { id } = useParams();
    const [ isUser, setIsUser ] = useState(false);

    // данные пользователя из хранилища
    const { userId } = JSON.parse(localStorage.getItem(`authData`))
    const { userData, setUserData, isLoading, setIsLoading } = useContext(ContextProvider)
    const [ totalPages, setTotalPages ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ otherUsers, setOtherUsers ] = useState([1])

    useEffect(() => { 
        setIsLoading(true);
        getUserData(id).then(data => {
            setUserData(data.data);
            // проверка, является ли страница пользователя страницей авторизованного пользователя
            if(data.data.id === userId) {
                setIsUser(true);
                setIsLoading(false)

            } else {
                setIsUser(false);
                setIsLoading(false)
            };
            document.title = `${data.data.first_name} ${data.data.last_name}`
        });


        // получение остальых пользователей
        Promise.all([getAllUsers(1), getAllUsers(2)]).then(data => {
            const [p1, p2] = data;
            setOtherUsers([...p1.data, ...p2.data]);
        })

    }, [ id])


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
                        setCurrentPage={setCurrentPage}
                        setTotalPages={setTotalPages}
                        id={id}/>
                
                <div className="others">
                    <h1>Другие пользователи</h1>
                    <div className="other-people">
                        { otherUsers.map(e => {
                            if(e.id !== Number(userId) && e.id !== Number(id)) {
                                return (
                                <Link key={e.id} to={`/user/${e.id}`}>
                                    <img src={e.avatar} alt=""/>
                                    <p>{e.first_name}</p>
                                </Link>)
                            } else return ``
                        }) }
                    </div>
                </div>
            </div>
            }

            <Outlet />
        </>
    )
}