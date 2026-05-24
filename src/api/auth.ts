import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const signupUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await API.post("/auth/signup", data);

  return response.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await API.post("/auth/login", data);

  return response.data;
};