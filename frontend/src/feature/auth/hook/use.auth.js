import { setuser, setloading, seterror } from "../state/auth.slice";
import { register } from "../services/auth.api";
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

  return { handelregister };
};
