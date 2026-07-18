import { RouterProvider } from "react-router-dom";
import router from "./app.routes";
import { useauth } from "../feature/auth/hook/use.auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function App() {
  const { handlegetme } = useauth();
const user = useSelector((state) => state.auth.user);


  useEffect(() => {
    handlegetme();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
