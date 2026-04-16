import { Link } from "react-router";

export default function HomePage(){
    return(
        <section className="home-section">
            <div className="navbar">
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/register">
                    <button>Register</button>
                </Link>
                <Link to="/post">
                    <button>Go To Posts</button>
                </Link>
            </div>
            <div className="home-header">
                <h1>Welcome to my blog!</h1>
                <h2>A full stack web development project</h2>
            </div>
        </section>
    )
}