import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getMyAddress, getRestaurants, refreshToken } from "../api/api";
import { ApiError, AuthRes } from "@/types/apiTypes";
import { RestaurantsRes, RestautantFilters } from "@/types/restaurantTypes";
import { AxiosError } from "axios";

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
    retry: false,
  });
};

export const useGetRestaurants = (
  address: string | null,
  filters: RestautantFilters
) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery<RestaurantsRes, AxiosError>({
    queryKey: ["restaurants", address, filters],
    queryFn: ({ pageParam }) => getRestaurants(address!, pageParam, filters),
    enabled: !!address,
    getNextPageParam: (lastPage) => lastPage.nextCursos,
    initialPageParam: null,
    retry: 1,
  });
};
