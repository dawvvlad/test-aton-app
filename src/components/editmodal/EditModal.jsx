import { useContext } from "react"
import "./editmodal.css"
import { useNavigate, useParams } from "react-router-dom"
import { ContextProvider } from "../../context/Context"
import { editResource } from "../../api"
import { toast } from "react-toastify"

export const EditModal = () => {
    const { resourceId } = useParams()
    const navigate = useNavigate()
    const { resources } = useContext(ContextProvider);

    function edit() {
        const curRes = resources.find(e => e.id === Number(resourceId));
        const [ name, year, color ] = document.querySelectorAll(`.input-text`)

        editResource(resourceId, name.value, year.value, color.value).then(data => {
            const date = new Date(data.updatedAt)

            toast.info(`Изменено ${Intl.DateTimeFormat('ru-RU', { 
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric' 
            }).format(date)}`, 
            {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
        
        curRes.name = name.value;
        curRes.year = year.value;
        curRes.color = color.value;
        
        navigate(-1)
    }

    return (
        <>
            <div className="container modal">
            <div className="modal-window edit">
                <span onClick={() => navigate(-1)}>✕</span>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <input className="input-text" type="text" placeholder="name" />
                    <input className="input-text" type="text" placeholder="year" />
                    <input className="input-text" type="text" placeholder="color" />
                    <input onClick={edit} className="submit-btn" type="submit" value="Сохранить"/>
                </form>
            </div>
        </div>
        </>
    )
}