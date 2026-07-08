import axios from "axios";

const authapiinstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export async function register({
  fullname,
  email,
  password,
  contact,
  isseller,
}) {
  const response = await authapiinstance.post("/register", {
    fullname,
    email,
    password,
    contact,
    isseller,
  });
  return response.data; 
}

export async function login({ email, password }) {
  const response = await authapiinstance.post("/login", {
    email,
    password,
  });
  return response.data;
}


export async function getme() {
  const response = await authapiinstance.get("/me");
  return response.data;
}