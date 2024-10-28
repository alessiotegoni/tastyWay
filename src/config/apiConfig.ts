import axios, { CreateAxiosDefaults } from "axios";

const defaultApi: CreateAxiosDefaults = {
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
};

export const api = axios.create(defaultApi);

export const privateApi = axios.create(defaultApi);

export const RESTAURANTS_LIMIT = 9;
export const RESTAURANT_ITEMS_LIMIT = 15;
export const RESTAURANT_ORDERS_LIMIT = 12;

export const PREV_ORDERS_LIMIT = 14;
