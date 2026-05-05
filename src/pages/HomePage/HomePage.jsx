import { Link } from "react-router";
import styles from "./HomePage.module.css";

export default function HomePage(){
    return(
        <section className={styles.homeSection}>
            <div className={styles.homeHeader}>
                <h1>Welcome to my blog</h1>
                <h2>A project in full stack web development</h2>
            </div>
            <div className={styles.backendHeader}>
                <h2>BACKEND</h2>
                <h3>Node.js</h3>
                <h3>Rest API</h3>
                <h3>PostgreSQL</h3>
            </div>
            <div className={styles.contentHeader}>
                <div className={styles.content}>
                    <h3>Tech stack</h3>
                    <ul>
                        <li>Node.js</li>
                        <li>Express</li>
                        <li>PostgreSQL</li>
                        <li>Prisma ORM</li>
                        <li>JWT authorization</li>
                    </ul>
                </div>
            </div>
            <div className={styles.contentContainer}>
                <h4>Authentication & Authorization</h4>
                <ul>
                    <li>Secure login and registration using passport</li>
                    <li>JWT-based authentication for protected routes</li>
                    <li>Authenticated users can create posts and comments</li>
                    <li>Public endpoints for reading posts and comments</li>
                </ul>
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    <h4>RESTful API Design</h4>
                    <ul>
                        <li>Resource-based endpoints for:</li>
                        <ul>
                            <li>Users</li>
                            <li>Posts</li>
                            <li>Comments</li>
                        </ul>
                        <li>Pagination support for posts and comments</li>
                        <li>Consistent JSON response structure</li>
                        <li>Error handling for clean API responses</li>
                    </ul>
                </div>
            </div>

            <div className={styles.frontendHeader}>
                <h2>FRONTEND</h2>
                <h3>React Js</h3>
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    <h3>Tech stack</h3>
                    <ul>
                        <li>ReactJS</li>
                        <li>React router</li>
                        <li>CSS modules</li>
                    </ul>
                </div>
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    
                </div>
            </div>
        </section>
    )
}