import axios from "axios";

const baseURL = "http://localhost:3000/api";

export const api = axios.create({ baseURL, withCredentials: true });

export const RESTAURANTS_LIMIT = 9;

export const RESTAURANT_ITEMS_LIMIT = 15;
