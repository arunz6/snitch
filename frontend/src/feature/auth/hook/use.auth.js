import { setuser, setloading, seterror } from "../state/auth.slice";
import { login, register, getme } from "../services/auth.api";
import { useDispatch } from "react-redux";

export const useauth = () => {
  const dispatch = useDispatch();
  async function handelregister({
    fullname,
    email,
    password,
    contact,
    isseller = false,
  }) {
    const data = await register({
      fullname,
      email,
      password,
      contact,
      isseller,
    });
    dispatch(setuser(data.user));
    return data.user;
  }

  async function handlelogin({ email, password }) {
    const data = await login({
      email,
      password,
    });
    dispatch(setuser(data.user));
    return data.user;
  }

  async function handlegetme() {
    const data = await getme();
    dispatch(setuser(data.user));
    return data.user;
  }
  return { handelregister, handlelogin, handlegetme };
};
