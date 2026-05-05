import githubLogo from "../../assets/github.svg";
import styles from './Footer.module.css';

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <h4>Created By Lefteris</h4>
                <div className={styles.githubContainer}>
                    <a href="https://github.com/Yogs991/Frontend-blogAPI">
                        <img src={githubLogo} alt="github" />
                    </a>
                </div>
            </div>
        </footer>
    )
}