import {useAuth} from "../../context/useAuth";
import { useNavigate, Link, NavLink } from "react-router";
import styles from './Header.module.css';

export default function Header(){
    const {isAuthenticated, logout} = useAuth();

    const navigate = useNavigate();
    
    const handleLogout = () =>{
        logout();
        navigate("/login");
    }

    return(
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.headerLogo}>
                    <h3>The Odin Project</h3>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.navContainer}>
                        <nav className={styles.nav}>
                            <NavLink to="/" className={({isActive})=> isActive ? styles.active : undefined}>
                                Home
                            </NavLink>
                            <NavLink to="/post" className={({isActive})=> isActive ? styles.active : undefined}>
                                Posts
                            </NavLink>
                            {isAuthenticated &&(
                                <NavLink to="/create-post" className={({isActive})=> isActive ? styles.active : undefined}>
                                    Create Post
                                </NavLink>
                            )}
                        </nav>
                    </div>
                    <div className={styles.authContainer}>
                        { isAuthenticated ? (
                            <button onClick={handleLogout} className={styles.logoutBtn}>
                                Logout
                            </button>
                        ):(
                            <>
                                <NavLink to="/login" className={({isActive})=> isActive ? styles.active : undefined}>
                                    Login
                                </NavLink>
                                <NavLink to="/register" className={({isActive})=> isActive ? styles.active : undefined}>
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}