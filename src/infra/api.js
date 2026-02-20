import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOneUser = async (user) => {
  try {
    const response = await axios.post(`${API}/users`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};
