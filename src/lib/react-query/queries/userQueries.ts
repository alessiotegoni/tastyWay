import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError } from "@/types/apiTypes";
import { UserPrevOrderRes } from "@/types/userTypes";
import {
  getMyAddress,
  getUserActiveOrders,
  getUserActiveOrdersCount,
  getUserPrevOrders,
  getUserProfile,
} from "@/lib/api/userApi";
import useAxiosPrivate from "@/hooks/usePrivateApi";
import {
  getRestaurantActiveOrders,
  getRestaurantActiveOrdersCount,
} from "@/lib/api/restaurantApi";
import { UserProfileType } from "@/lib/validations/userProfileSchema";

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
    enabled: !!lat && !!lng && !initialData,
    initialData,
  });
};

export const useGetUserProfile = () => {
  const privateApi = useAxiosPrivate();

  return useQuery<UserProfileType, ApiError>({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(privateApi),
  });
};

export const useGetPrevOrders = () => {
  const privateApi = useAxiosPrivate();

  return useInfiniteQuery<UserPrevOrderRes, ApiError>({
    queryKey: ["userPrevOrders"],
    queryFn: ({ pageParam }) => getUserPrevOrders(privateApi, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  });
};

export const useGetActiveOrdersCount = (
  isCmpAccount: boolean | undefined,
  isAuthenticated: boolean
) => {
  const privateApi = useAxiosPrivate();

  const queryKey = isCmpAccount
    ? ["restaurantActiveOrdersCount"]
    : ["userActiveOrdersCount"];

  return useQuery<number, ApiError>({
    queryKey,
    queryFn: () =>
      isCmpAccount
        ? getRestaurantActiveOrdersCount(privateApi)
        : getUserActiveOrdersCount(privateApi),
    enabled: isAuthenticated,
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
    refetchInterval: 5_000,
  });
};
