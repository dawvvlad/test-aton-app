import { useContext } from "react";
import "./data-table.css";
import { ContextProvider } from "../../context/Context";
import { getResources } from "../../api";
import { Link } from "react-router-dom";

export const DataTable = (props) => {
    const { isUser, totalPages, currentPage, setCurrentPage } = props
    const { resources, setResources, setIsLoading } = useContext(ContextProvider);

    function nextPage() {
        setIsLoading(true)
        getResources(currentPage + 1).then(data => {
            setCurrentPage(data.page);
            setResources(data.data);
            setIsLoading(false);
        })
    }

    function prevPage () {
        setIsLoading(true)
        getResources(currentPage - 1).then(data => {
            setCurrentPage(data.page);
            setResources(data.data);
            setIsLoading(false);
        })
    }


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
                { resources.map(e => {
                    return <div className="data-table__body">
                                <p>{e.id}</p>
                                <p>{e.name}</p>
                                <p>{e.year}</p>
                                <p style={{ backgroundColor: `${e.color}` }}></p>
                                { isUser ? <p><Link to={`edit/${e.id}`}>Изменить</Link></p> : ``}
                            </div>
                            
                }) }
            </div>

            { totalPages > currentPage ? <button className="change-btn" onClick={() => nextPage()}>Next</button> : ``}
            { totalPages === currentPage ? <button className="change-btn" onClick={() => prevPage()}>Prev</button> : ``}
        </>
        
    )
}