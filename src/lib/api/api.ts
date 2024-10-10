import axios, { AxiosInstance } from "axios";
import { SigninType, SignupType } from "../validations/authSchemas";

import {
  RestaurantsRes,
  RestaurantFilters,
  RestaurantRes,
  RestaurantItemsFilters,
  RestaurantItemRes,
} from "@/types/restaurantTypes";
import {
  api,
  RESTAURANT_ITEMS_LIMIT,
  RESTAURANTS_LIMIT,
} from "@/config/apiConfig";
import { CheckoutSessionBody } from "@/types/apiTypes";

export const getMyAddress = async (lat: number, lng: number) => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: {
        latlng: `${lat},${lng}`,
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        language: "it",
      },
    }
  );

  const address = data?.results?.at(0) as google.maps.GeocoderResult;

  if (!address) throw new Error("Indirizzo non trovato");

  const country = address.address_components.find((ac) =>
    ac.types.includes("country")
  )?.long_name;

  if (!country || country !== "Italia")
    throw new Error("Devi essere in italia per ordinare");

  console.log(address);

  return address.formatted_address.replace(", Italia", "");
};

export const getRestaurants = async (
  address: string,
  pageParam: unknown,
  filters: RestaurantFilters
) => {
  address = address.replace(/[, ]+/g, "-").replace(/--+/g, "-");

  const { data } = await api.get<RestaurantsRes>(`/restaurants`, {
    params: {
      pageParam,
      address,
      filters,
      limit: RESTAURANTS_LIMIT,
    },
  });

  return data;
};

export const getRestaurantInfo = async (restaurantName: string) => {
  restaurantName = restaurantName.replace(/-/g, " ");

  const { data } = await api.get<RestaurantRes>(
    `/restaurants/${restaurantName}`
  );

  return data;
};

export const getRestaurantItems = async (
  restaurantId: string,
  pageParam: unknown,
  filters: RestaurantItemsFilters
) => {
  const { data } = await api.get<RestaurantItemRes>(
    `/restaurants/${restaurantId}/items`,
    {
      params: {
        pageParam,
        filters,
        limit: RESTAURANT_ITEMS_LIMIT,
      },
    }
  );

  return data;
};

export const createCheckoutSessionUrl = async (
  body: CheckoutSessionBody,
  privateApi: AxiosInstance
) => {
  const { data } = await privateApi.post<string>(
    "/users/orders/create-checkout-session",
    body
  );

  return data;
};

export const getUserActiveOrders = async (privateApi: AxiosInstance) => {
  const { data } = await privateApi.get("/users/active-orders");

  return data;
};

export const getRestaurantActiveOrders = async (privateApi: AxiosInstance) => {
  const { data } = await privateApi.get("/restaurants/active-orders");

  return data;
};

export const signin = async (data: SigninType) =>
  (await api.post("/auth/signin", data)).data;

export const signup = async (data: SignupType) =>
  (await api.post("/auth/signup", data)).data;

export const refreshToken = async () => (await api.get("/auth/refresh")).data;

export const logout = async () => (await api.delete("/auth/logout")).data;
