import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserData } from "../../api";

export const UserPage = () => {
    // Берем информацию о конкретном пользователе
    const { id }= useParams();
    const [ isUser, setIsUser ] = useState(false)
    const { userId } = JSON.parse(localStorage.getItem(`authData`))

    useEffect(() => {
        getUserData(id).then(data => {
            console.log(data.data);
            console.log(userId);

            if(data.data.id === userId) {
                setIsUser(true);
                console.log(isUser);
            } else {
                console.log(isUser);
                setIsUser(false)
            }
        })        
    }, [])

    return (
        <>
        <h1>User Page</h1>
        </>
    )
}