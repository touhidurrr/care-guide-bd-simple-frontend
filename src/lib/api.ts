import axios from "axios";

const api = axios.create({
  baseURL: "https://care-guide.touhidur.dev/api",
  withCredentials: true,
});

export const logIn = async (usernameOrEmail, password) => {
  try {
    const { data } = await api.post("/login", {
      usernameOrEmail,
      password,
    });
    return data;
  } catch (err) {
    throw err?.response?.data;
  }
};

export const register = async (username, name, email, password) => {
  try {
    const { data } = await api.post("/register", {
      name,
      username,
      email,
      password,
    });
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const getPosts = async () => {
  try {
    const { data } = await api.get("/posts");
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const addPost = async (title, content) => {
  try {
    const { data } = await api.post("/posts", { title, content });
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const getUsers = async () => {
  try {
    const { data } = await api.get("/users");
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const restartServer = async () => {
  try {
    const { data } = await api.get("/restart");
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};
