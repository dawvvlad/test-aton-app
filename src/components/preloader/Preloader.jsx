import "./preloader.css";

export const Preloader = () => {
    return (
        <>
            <div className="preloader">
                <div className="lds-dual-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    )
}