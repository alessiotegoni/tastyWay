import useAxiosPrivate from "@/hooks/usePrivateApi";
import {
  getMyRestaurant,
  getRestaurantInfo,
  getRestaurantItems,
  getRestaurants,
} from "@/lib/api/restaurantApi";
import { RestaurantProfileType } from "@/lib/validations/RestaurantProfileSchema";
import { ApiError } from "@/types/apiTypes";
import {
  RestaurantFilters,
  RestaurantItemRes,
  RestaurantItemsFilters,
  RestaurantRes,
  RestaurantsRes,
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

export const useGetRestaurantInfo = (restaurantName: string | undefined) =>
  useQuery<RestaurantRes, ApiError>({
    queryKey: ["restaurantInfo", restaurantName],
    queryFn: () => getRestaurantInfo(restaurantName!),
    enabled: !!restaurantName,
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

export const useGetMyRestaurant = () => {
  const privateApi = useAxiosPrivate();

  return useQuery<RestaurantProfileType, ApiError>({
    queryKey: ["myRestaurant"],
    queryFn: () => getMyRestaurant(privateApi),
  });
};