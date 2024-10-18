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
  PREV_ORDERS_LIMIT,
  RESTAURANT_ITEMS_LIMIT,
  RESTAURANTS_LIMIT,
} from "@/config/apiConfig";
import { CheckoutSessionBody } from "@/types/apiTypes";
import { UserPrevOrderRes } from "@/types/userTypes";
import {
  UserProfileType,
  UserSecurityType,
} from "../validations/userProfileSchema";
import { RestaurantProfileType } from "../validations/RestaurantProfileSchema";

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

export const getMyRestaurant = async (privateApi: AxiosInstance) =>
  (await privateApi.get<RestaurantProfileType>("/restaurants/my/restaurant"))
    .data;

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

export const getUserActiveOrders = async (privateApi: AxiosInstance) =>
  (await privateApi.get("/users/active-orders")).data;

export const getRestaurantActiveOrders = async (privateApi: AxiosInstance) =>
  (await privateApi.get("/restaurants/active-orders")).data;

export const getUserPrevOrders = async (
  privateApi: AxiosInstance,
  pageParam: unknown
) => {
  const { data } = await privateApi.get<UserPrevOrderRes>(`/users/orders`, {
    params: {
      pageParam,
      limit: PREV_ORDERS_LIMIT,
    },
  });

  return data;
};

export const getUserProfile = async (privateApi: AxiosInstance) =>
  (await privateApi.get<UserProfileType>("/users/profile")).data;

export const updateUserProfile = async (
  privateApi: AxiosInstance,
  data: UserProfileType
) => (await privateApi.patch<{ message: string }>("/users/profile", data)).data;

export const updateUserSecurity = async (
  privateApi: AxiosInstance,
  data: UserSecurityType
) =>
  (await privateApi.patch<{ message: string }>("/users/profile/security", data))
    .data;

export const signin = async (data: SigninType) =>
  (await api.post("/auth/signin", data)).data;

export const signup = async (data: SignupType) =>
  (await api.post("/auth/signup", data)).data;

export const refreshToken = async () => (await api.get("/auth/refresh")).data;

export const logout = async () => (await api.delete("/auth/logout")).data;
