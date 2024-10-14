import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getMyAddress,
  getRestaurantActiveOrders,
  getRestaurantInfo,
  getRestaurantItems,
  getRestaurants,
  getUserActiveOrders,
  getUserPrevOrders,
  refreshToken,
} from "../api/api";
import { ApiError, AuthRes } from "@/types/apiTypes";
import {
  RestaurantsRes,
  RestaurantFilters,
  RestaurantItemsFilters,
  RestaurantRes,
  RestaurantItemRes,
} from "@/types/restaurantTypes";
import useAxiosPrivate from "@/hooks/usePrivateApi";
import { UserPrevOrder, UserPrevOrderRes } from "@/types/userTypes";

export const useGetMyAddress = (lat: number, lng: number) => {
  const queryClient = useQueryClient();

  const initialData = queryClient.getQueryData<string | undefined>([
    "myLocation",
    lat,
    lng,
  ]);

  return useQuery<string>({
    queryKey: ["myLocation", lat, lng],
    queryFn: () => getMyAddress(lat, lng),
    enabled: !!lat && !!lng && !!!initialData,
    initialData,
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  const cachedToken = queryClient.getQueryData<AuthRes>(["accessToken"]);
  const hasToken = !!cachedToken;

  return useQuery<AuthRes, ApiError>({
    queryKey: ["accessToken"],
    queryFn: refreshToken,
    enabled: !hasToken,
    retry: 1,
  });
};

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

export const useGetPrevOrders = () => {
  const privateApi = useAxiosPrivate();

  return useInfiniteQuery<UserPrevOrderRes, ApiError>({
    queryKey: ["userPrevOrders"],
    queryFn: ({ pageParam }) => getUserPrevOrders(privateApi, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  });
};

export const useGetActiveOrders = (
  isCmpAccount: boolean,
  isAuthenticated: boolean
) => {
  const privateApi = useAxiosPrivate();

  const queryKey = isCmpAccount
    ? ["restaurantActiveOrders"]
    : ["userActiveOrders"];

  const queryFn = () =>
    isCmpAccount
      ? getRestaurantActiveOrders(privateApi)
      : getUserActiveOrders(privateApi);

  return useQuery({
    queryKey,
    queryFn,
    enabled: isAuthenticated,
  });
};
