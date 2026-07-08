import { RouterProvider } from "react-router-dom";
import router from "./app.routes";
import { useauth } from "../feature/auth/hook/use.auth";
import { useEffect } from "react";

function App() {
  const { handlegetme } = useauth();

  useEffect(() => {
    handlegetme();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
