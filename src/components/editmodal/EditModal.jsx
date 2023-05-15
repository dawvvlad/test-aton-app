import { memo, useContext, useEffect } from "react"
import "./editmodal.css"
import { useNavigate, useParams } from "react-router-dom"
import { deleteResource, editResource, pushResource } from "../../api"
import { toast } from "react-toastify"
import { ContextProvider } from "../../context/Context"

export const EditModal = memo(function EditModal() {
    const { resourceId } = useParams();
    const { resources, setIsLoading, targetId } = useContext(ContextProvider);
    
    const navigate = useNavigate()

    // данные из хранилища
    const res = JSON.parse(localStorage.getItem(`resources`)) || [];

    useEffect(() => {
        if (resourceId) {
            document.title = `Изменить объект`
        } else document.title = `Добавить объект`
    }, [])


    //функция удаления
    function handleDelete(e) {
        setIsLoading(true)
        const curRes = resources.find(e => e.id === Number(resourceId));

        //отправка DELETE-запросак API
        deleteResource(curRes).then(data => {
            setIsLoading(false);
            res.splice(res.indexOf(res.find(e => e.id === curRes.id)), 1)
            localStorage.setItem('resources', JSON.stringify(res));
            navigate(-1);

            toast.success(`Удалено`,
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
    }

    // функция изменения конкретного элемента
    function handleEdit() {
        setIsLoading(true)
        const [name, year] = document.querySelectorAll(`.input-text`);
        const [r, g, b] = document.querySelectorAll(`.input-range`);

        if (!name.value || !year.value) {
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
            setIsLoading(false)
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

            setIsLoading(false)
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
        const [name, year] = document.querySelectorAll(`.input-text`);
        const [r, g, b] = document.querySelectorAll(`.input-range`);
        setIsLoading(true)

        if (!name.value || !year.value) {
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
            setIsLoading(false)
            return;
        }

        pushResource(res.length + 1).then(data => {
            // добавление в хранилище значений из формы
            localStorage.setItem(`resources`, JSON.stringify([...res, {
                id: data.id,
                name: name.value, year:
                    year.value,
                color: `rgb(${r.value}, ${g.value}, ${b.value})`
            }]));

            toast.info(`Объект ID ${data.id} добавлен`,
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
            navigate(-1);

            setIsLoading(false)
        })

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
                        <input onClick={resourceId ? handleEdit : handlePush} className="submit-btn" type="submit" value="Сохранить" />
                    </form>

                    {resourceId ? <button id={ resourceId } className="submit-btn delete" onClick={handleDelete}>Удалить</button> : ``}
                </div>
            </div>
        </>
    )
})