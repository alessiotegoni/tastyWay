import {
  api,
  RESTAURANT_ITEMS_LIMIT,
  RESTAURANTS_LIMIT,
} from "@/config/apiConfig";
import {
  RestaurantFilters,
  RestaurantItemRes,
  RestaurantItemsFilters,
  RestaurantRes,
  RestaurantsRes,
  RestaurantUserOrder,
} from "@/types/restaurantTypes";
import { AxiosInstance } from "axios";
import { RestaurantProfileType } from "../validations/RestaurantProfileSchema";

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

export const getRestaurantActiveOrders = async (privateApi: AxiosInstance) =>
  (await privateApi.get("/restaurants/my/restaurant/active-orders")).data;

export const getRestaurantOrder = async (
  privateApi: AxiosInstance,
  orderId: string
) =>
  (
    await privateApi.get<RestaurantUserOrder>(
      `/restaurants/my/restaurant/orders?id=${orderId}`
    )
  ).data;

export const getRestaurantInfo = async (restaurantName: string) => {
  restaurantName = restaurantName.replace(/-/g, " ");

  const { data } = await api.get<RestaurantRes>(
    `/restaurants/${restaurantName}`
  );

  return data;
};

export const getMyRestaurant = async (privateApi: AxiosInstance) =>
  (await privateApi.get<RestaurantProfileType>("/restaurants/my/restaurant"))
    .data;

export const updateMyRestaurant = async (
  privateApi: AxiosInstance,
  data: RestaurantProfileType
) =>
  (
    await privateApi.patch("/restaurants/my/restaurant", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;
