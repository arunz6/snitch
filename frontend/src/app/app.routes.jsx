import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Register from "../feature/auth/pages/Register";
import Login from "../feature/auth/pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
