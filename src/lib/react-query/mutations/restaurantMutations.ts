import { useAuth } from "@/contexts/AuthContext";
import useAxiosPrivate from "@/hooks/usePrivateApi";
import { updateMyRestaurant } from "@/lib/api/restaurantApi";
import { RestaurantProfileType } from "@/lib/validations/RestaurantProfileSchema";
import { ApiError } from "@/types/apiTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

export const useUpdateMyRestaurant = (
  form: UseFormReturn<RestaurantProfileType, any, undefined>,
  restaurantName: string | undefined
) => {
  const { refreshToken } = useAuth();
  const privateApi = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, ApiError, RestaurantProfileType>({
    mutationKey: ["updateMyRestaurant"],
    mutationFn: (data) => updateMyRestaurant(privateApi, data),
    onSuccess: (_, variables) => {
      if (restaurantName !== form.getValues("name")) refreshToken();

      queryClient.setQueryData(["myRestaurant"], () => variables);
    },
  });
};
