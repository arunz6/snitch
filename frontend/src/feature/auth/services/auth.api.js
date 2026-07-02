import axios from "axios";

const authapiinstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register({
  fullname,
  email,
  password,
  contact,
  isseller,
}) {
  const response = await authapiinstance.post("/api/auth/register", {
    fullname,
    email,
    password,
    contact,
    isseller,
  });
  return response.data;
}
