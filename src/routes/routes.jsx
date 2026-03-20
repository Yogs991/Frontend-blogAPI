import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Posts from "../pages/Posts/Posts";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element : <App />,
        children:[
            {index: true, element: <HomePage/>},
            {path: "login", element: <Login />},
            {path: "register", element: <Register />},
            {path: "post", element: <Posts/>}
        ]
    }
]);

export default router;