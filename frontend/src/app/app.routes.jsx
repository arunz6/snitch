import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Register from "../feature/auth/pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
