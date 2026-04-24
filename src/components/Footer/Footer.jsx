import githubLogo from "../../assets/github.svg";

export default function Footer(){
    return(
        <footer className="footer">
            <div className="footer-container">
                <h4>Created By Lefteris</h4>
                <div className="github-container">
                    <a href="https://github.com/Yogs991/Frontend-blogAPI">
                        <img src={githubLogo} alt="github" />
                    </a>
                </div>
            </div>
        </footer>
    )
}