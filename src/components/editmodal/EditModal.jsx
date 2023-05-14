import { memo, useContext } from "react"
import "./editmodal.css"
import { useNavigate, useParams } from "react-router-dom"
import { editResource } from "../../api"
import { toast } from "react-toastify"
import { ContextProvider } from "../../context/Context"

export const EditModal = memo(function EditModal() {
    const { resourceId } = useParams();
    const { resources } = useContext(ContextProvider);

    const navigate = useNavigate()

    // данные из хранилища
    const res = JSON.parse(localStorage.getItem(`resources`)) || [];

    // функция изменения конкретного элемента
    function handleEdit() {
        const [ name, year ] = document.querySelectorAll(`.input-text`);
        const [ r, g, b]  = document.querySelectorAll(`.input-range`);

        if(!name.value || !year.value) {
            toast.error('Заполните поля', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }

        // находит выбранный элемент
        const curRes = resources.find(e => e.id === Number(resourceId));
        
        // ajax-запрос к API и отравка уведомления
        editResource(resourceId, name.value, year.value, `rgb(${r.value}, ${g.value}, ${b.value})`).then(data => {
            const date = new Date(data.updatedAt);

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
        curRes.color = `rgb(${r.value}, ${g.value}, ${b.value})`;

        // запись изменений в хранилище
        res[res.findIndex((item) => item.id === curRes.id)] = curRes;
        localStorage.setItem('resources', JSON.stringify(res));

        navigate(-1)
    }


    // функция добавления нового элемента
    function handlePush() {
        const [ name, year ] = document.querySelectorAll(`.input-text`);
        const [ r, g, b]  = document.querySelectorAll(`.input-range`);
        
        if(!name.value || !year.value) {
            toast.error('Заполните поля', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }

        // добавление в хранилище значений из формы
        localStorage.setItem(`resources`, JSON.stringify([...res, {
            id: res.length + 1, 
            name: name.value, year: 
            year.value, 
            color: `rgb(${r.value}, ${g.value}, ${b.value})` }]));

            toast.info(`Объект ID ${res.length + 1} добавлен`, 
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
        navigate(-1)
    }

    return (
        <>
            <div className="container modal">
            <div className="modal-window edit">
                <span onClick={() => navigate(-1)}>✕</span>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <input className="input-text edit-modal" type="text" placeholder="name" />
                    <input className="input-text edit-modal" type="text" placeholder="year" />
                    <div className="color-edit">
                        <p>color</p>
                        <label htmlFor="">
                            r<input className="input-range" type="range" min={0} max={255} />
                        </label>
                        <label htmlFor="">
                            g<input className="input-range" type="range" min={0} max={255} />
                        </label>
                        <label htmlFor="">
                            b<input className="input-range" type="range" min={0} max={255} />
                        </label>
                    </div>
                    <input onClick={ resourceId ? handleEdit : handlePush} className="submit-btn" type="submit" value="Сохранить"/>
                </form>
            </div>
        </div>
        </>
    )
})