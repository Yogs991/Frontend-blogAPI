import {Link} from "react-router";

export default function ErrorPage(){
    return(
        <main className="main">
            <div className="error-container">
                <h1>Something went wrong</h1>
                <div className="error-content">
                    <p>
                        The page you are looking for doesn't exist
                    </p>
                </div>
                <p>
                    Click <Link to={"/"}>here</Link> to go back to main page
                </p>
            </div>
        </main>
    )
}