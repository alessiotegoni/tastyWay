import useAxiosPrivate from "@/hooks/usePrivateApi";
import {
  getMyRestaurant,
  getRestaurantInfo,
  getRestaurantItems,
  getRestaurantOrder,
  getRestaurants,
  getRestauratOrders,
} from "@/lib/api/restaurantApi";
import { RestaurantProfileType } from "@/lib/validations/RestaurantProfileSchema";
import { ApiError } from "@/types/apiTypes";
import {
  RestaurantFilters,
  RestaurantItemRes,
  RestaurantItemsFilters,
  RestaurantOrdersFilters,
  RestaurantOrdersRes,
  RestaurantRes,
  RestaurantsRes,
  RestaurantUserOrder,
} from "@/types/restaurantTypes";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useGetRestaurants = (
  address: string | null,
  filters: RestaurantFilters
) =>
  useInfiniteQuery<RestaurantsRes, ApiError>({
    queryKey: ["restaurants", address, filters],
    queryFn: ({ pageParam }) => getRestaurants(address!, pageParam, filters),
    enabled: !!address,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  });

export const useGetRestaurantItems = (
  restaurantId: string | undefined,
  filters: RestaurantItemsFilters
) =>
  useInfiniteQuery<RestaurantItemRes, ApiError>({
    queryKey: ["restaurantItems", restaurantId, filters],
    queryFn: ({ pageParam }) =>
      getRestaurantItems(restaurantId!, pageParam, filters),
    enabled: !!restaurantId,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  });

export const useGetRestaurantOrders = (filters: RestaurantOrdersFilters) => {
  const privateApi = useAxiosPrivate();

  return useInfiniteQuery<RestaurantOrdersRes, ApiError>({
    queryKey: ["restaurantOrders"],
    queryFn: ({ pageParam }) =>
      getRestauratOrders(privateApi, pageParam, filters),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  });
};

export const useGetRestaurantOrder = (orderId: string | undefined) => {
  const privateApi = useAxiosPrivate();

  return useQuery<RestaurantUserOrder, ApiError>({
    queryKey: ["restaurantOrder", orderId],
    queryFn: () => getRestaurantOrder(privateApi, orderId!),
    enabled: !!orderId,
  });
};

export const useGetRestaurantInfo = (restaurantName: string | undefined) =>
  useQuery<RestaurantRes, ApiError>({
    queryKey: ["restaurantInfo", restaurantName],
    queryFn: () => getRestaurantInfo(restaurantName!),
    enabled: !!restaurantName,
  });

export const useGetMyRestaurant = () => {
  const privateApi = useAxiosPrivate();

  return useQuery<RestaurantProfileType, ApiError>({
    queryKey: ["myRestaurant"],
    queryFn: () => getMyRestaurant(privateApi),
  });
};
