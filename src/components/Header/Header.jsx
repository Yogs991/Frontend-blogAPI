import {useAuth} from "../../context/useAuth";
import { useNavigate, Link, NavLink } from "react-router";

export default function Header(){
    const {isAuthenticated, logout} = useAuth();

    const navigate = useNavigate();
    
    const handleLogout = () =>{
        logout();
        navigate("/login");
    }

    return(
        <header className="header">
            <div className="header-container">
                <div className="headerLogo">
                    <h3>TOP</h3>
                </div>
                <div className="auth-container">
                    { isAuthenticated ? (
                        <button onClick={handleLogout} className="btn-logout">
                            Logout
                        </button>
                    ):(
                        <>
                            <NavLink to="/login" className = "btn-login">
                                Login
                            </NavLink>
                            <NavLink to="/register" className = "btn-register">
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
                <div className="nav-container">
                    <nav className="nav">
                        <NavLink to="/">
                            Home
                        </NavLink>
                        <NavLink to="/post">
                            Posts
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
    )
}