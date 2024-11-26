import axios from "axios";

const API_URL = "https://reqres.in/api";

export const loginUser = async (credential) => {
  const response = await axios.post(`${API_URL}/login`, credential);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users?page=1`);
  return response.data.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/users/${id}`);
  return response.data;
};
