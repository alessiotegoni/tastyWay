import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/usePrivateApi";
import { ApiError, CheckoutSessionBody } from "@/types/apiTypes";
import {
  createCheckoutSessionUrl,
  updateUserProfile,
  updateUserSecurity,
} from "@/lib/api/userApi";
import {
  UserProfileType,
  UserSecurityType,
} from "@/lib/validations/userProfileSchema";

export const useCreateCheckoutSession = () => {
  const privateApi = useAxiosPrivate();

  return useMutation<string, ApiError, CheckoutSessionBody>({
    mutationKey: ["checkoutSessionUrl"],
    mutationFn: (data) => createCheckoutSessionUrl(data, privateApi),
  });
};

export const useUpdateUserProfile = () => {
  const privateApi = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, ApiError, UserProfileType>({
    mutationKey: ["updateUserProfile"],
    mutationFn: (data) => updateUserProfile(privateApi, data),
    onSuccess: (_, variables) =>
      queryClient.setQueryData(["userProfile"], () => variables),
  });
};

export const useUpdateUserSecurity = () => {
  const privateApi = useAxiosPrivate();

  return useMutation<{ message: string }, ApiError, UserSecurityType>({
    mutationKey: ["updateUserSecurity"],
    mutationFn: (data) => updateUserSecurity(privateApi, data),
  });
};
