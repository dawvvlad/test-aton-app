import { useContext, useEffect } from "react";
import "./data-table.css";
import { ContextProvider } from "../../context/Context";

export const DataTable = (props) => {
    const { isUser } = props
    const { resources, setResources } = useContext(ContextProvider);

    useEffect(() => {
        console.log(resources);
    })

    return (
        <div className="data-table">
            <h1>hi</h1>
        </div>
    )
}