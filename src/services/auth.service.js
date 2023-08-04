import { BASE_URL } from "../config.js";
import axios from "./axios.service.js";

export const loginRequest = (data) => axios.post(`${BASE_URL}/login`, data);
export const registerRequest = (data) => axios.post(`${BASE_URL}/signup`, data);
export const profileRequest = () => axios.post(`${BASE_URL}/profile`);
export const logoutRequest = () => axios.post(`${BASE_URL}/logout`);