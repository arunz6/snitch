import { setuser, setloading, seterror } from "../slice/authslice";
import { register } from "../services/auth.api";
import { useDispatch } from "react-redux";

const userauth = () => {
  const dispatch = useDispatch();

  async function handelregister(
    fullname,
    email,
    password,
    contact,
    isseller = false,
  ) {
    const data = await register({
      fullname,
      email,
      password,
      contact,
      isseller,
    });
    dispatch(setuser(data.user));
  }
};
