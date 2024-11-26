import {
  api,
  RESTAURANT_ORDERS_LIMIT,
  RESTAURANTS_LIMIT,
} from "@/config/apiConfig";
import {
  OrderStatus,
  RestaurantFilters,
  RestaurantItem,
  RestaurantItemsFilters,
  RestaurantOrdersFilters,
  RestaurantOrdersRes,
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
  filters: RestaurantItemsFilters
) =>
  (
    await api.get<RestaurantItem[]>(`/restaurants/${restaurantId}/items`, {
      params: { filters },
    })
  ).data;

export const getRestaurantActiveOrdersCount = async (
  privateApi: AxiosInstance
) =>
  (await privateApi.get("/restaurants/my/restaurant/active-orders-count")).data;

export const getRestaurantActiveOrders = async (privateApi: AxiosInstance) =>
  (await privateApi.get("/restaurants/my/restaurant/active-orders")).data;

export const getRestauratOrders = async (
  privateApi: AxiosInstance,
  pageParam: unknown,
  filters: RestaurantOrdersFilters
) =>
  (
    await privateApi.get<RestaurantOrdersRes>(
      "/restaurants/my/restaurant/orders",
      {
        params: { pageParam, filters, limit: RESTAURANT_ORDERS_LIMIT },
      }
    )
  ).data;

export const getRestaurantOrder = async (
  privateApi: AxiosInstance,
  orderId: string
) =>
  (
    await privateApi.get<RestaurantUserOrder>(
      `/restaurants/my/restaurant/order/${orderId}`
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

export const createMyRestaurant = async (privateApi: AxiosInstance) =>
  (await privateApi.post("/restaurants/my/restaurant")).data;

export const updateMyRestaurant = async (
  privateApi: AxiosInstance,
  data: RestaurantProfileType
) =>
  (
    await privateApi.put("/restaurants/my/restaurant", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;

export const updateMyRestaurantImg = async (
  privateApi: AxiosInstance,
  restaurantImg: File
) =>
  (
    await privateApi.patch(
      "restaurants/my/restaurant/img",
      { restaurantImg },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
  ).data;

export const updateOrderStatus = async (
  privateApi: AxiosInstance,
  orderId: string,
  data: { status: OrderStatus }
) =>
  (await privateApi.patch(`/restaurants/my/restaurant/order/${orderId}`, data))
    .data;

export const deleteOrder = async (privateApi: AxiosInstance, orderId: string) =>
  (await privateApi.delete(`/restaurants/my/restaurant/order/${orderId}`)).data;
