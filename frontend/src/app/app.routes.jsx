import { createBrowserRouter } from "react-router-dom";
import Home from "../feature/products/pages/Home";
import Register from "../feature/auth/pages/Register";
import Login from "../feature/auth/pages/Login";
import Createproduct from "../feature/products/pages/Createproduct";
import ProductDashboard from "../feature/products/pages/Productdashbord";
import Protected from "../feature/auth/components/Protected";
import Productdetail from "../feature/products/pages/Productdetail";

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
    element: <Protected role="seller">
      <Createproduct />
    </Protected>,
  },
  {
    path: "/seller/productdashbord",
    element: <Protected role="seller">
      <ProductDashboard />
    </Protected>
  },
  {
    path: "/product/:id",
    element: <Productdetail />
  }
]);

export default router;
