import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Register from "../feature/auth/pages/Register";
import Login from "../feature/auth/pages/Login";
import Createproduct from "../feature/products/pages/Createproduct";

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
  {
    path: "/seller/createProduct",
    element: <Createproduct />,
  },
]);

export default router;
