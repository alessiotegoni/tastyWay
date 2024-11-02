import { refreshToken } from "@/lib/api/authApi";
import { ApiError, AuthRes } from "@/types/apiTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  const cachedToken = queryClient.getQueryData<AuthRes>(["accessToken"]);
  const hasToken = !!cachedToken;

  return useQuery<AuthRes, ApiError>({
    queryKey: ["accessToken"],
    queryFn: refreshToken,
    enabled: !hasToken,
  });
};
