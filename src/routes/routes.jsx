import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Posts from "../pages/Posts/Posts";
import PostDetails from "../pages/Posts/PostDetails";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element : <App />,
        errorElement: <ErrorPage/>,
        children:[
            {index: true, element: <HomePage/>},
            {path: "login", element: <Login />},
            {path: "register", element: <Register />},
            {path: "post", element: <Posts/>},
            {path: "post/:id", element: <PostDetails/>}
        ]
    }
]);

export default router;