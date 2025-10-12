import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://care-guide.touhidur.dev/api',
  baseURL: 'http://localhost:4041',
});

export const logIn = async (usernameOrEmail, password) => {
  try {
    const response = await api.post('/login', {
      usernameOrEmail,
      password,
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const register = async (username, name, email, password) => {
  try {
    const response = await api.post('/register', {
      name,
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};


export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};


export const uploadPost = async (title, content) => {
  try {
    const response = await api.post('/posts', {
      title,
      content,
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const restartServer = async () => {
  try {
    const response = await api.post('/restart');
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
}