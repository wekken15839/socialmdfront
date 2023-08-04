import { BASE_URL } from "../config";
import axios from "./axios.service.js";

export const createPostRequest = (data) => axios.post(`${BASE_URL}/post`, data, { headers: { "Content-Type": "multipart/form-data" } });
export const getPostsRequest = () => axios.get(`${BASE_URL}/posts`);
export const commentPostRequest = (postId, data) => axios.post(`${BASE_URL}/posts/comment/${postId}`, data)
export const likePostRequest = (postId) => axios.post(`${BASE_URL}/posts/like/${postId}`);
