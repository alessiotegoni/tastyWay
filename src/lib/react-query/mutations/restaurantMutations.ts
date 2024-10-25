import { useAuth } from "@/contexts/AuthContext";
import useAxiosPrivate from "@/hooks/usePrivateApi";
import { updateMyRestaurant, updateOrderStatus } from "@/lib/api/restaurantApi";
import { RestaurantProfileType } from "@/lib/validations/RestaurantProfileSchema";
import { ApiError } from "@/types/apiTypes";
import { OrderStatus, RestaurantUserOrder } from "@/types/restaurantTypes";
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

export const useUpdateOrderStatus = (orderId: string) => {
  const privateApi = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, ApiError, OrderStatus>({
    mutationKey: ["updateOrderStatus"],
    mutationFn: (orderStatus) =>
      updateOrderStatus(privateApi, orderId, { status: orderStatus }),
    onSuccess: (_, orderStatus) =>
      queryClient.setQueryData<RestaurantUserOrder>(
        ["restaurantOrder", orderId],
        (order) => ({
          ...order!,
          status: orderStatus,
        })
      ),
  });
};
