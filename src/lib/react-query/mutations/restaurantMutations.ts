import useAddress from "@/hooks/useAddress";
import { useAuth } from "@/contexts/AuthContext";
import useAxiosPrivate from "@/hooks/usePrivateApi";
import {
  createMyRestaurant,
  deleteOrder,
  updateMyRestaurant,
  updateMyRestaurantImg,
  updateOrderStatus,
} from "@/lib/api/restaurantApi";
import {
  defaultRestaurantValues,
  RestaurantProfileType,
} from "@/lib/validations/RestaurantProfileSchema";
import { ApiError } from "@/types/apiTypes";
import { OrderStatus, RestaurantUserOrder } from "@/types/restaurantTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

export const useCreateMyRestaurant = () => {
  const [_, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const privateApi = useAxiosPrivate();
  const { selectedAddress } = useAddress();

  return useMutation<{ message: string }, ApiError>({
    mutationKey: ["createMyRestaurant"],
    mutationFn: () => createMyRestaurant(privateApi),
    onSuccess: () => {
      queryClient.setQueryData(["myRestaurant"], () => ({
        ...defaultRestaurantValues,
        address: selectedAddress ?? "",
      }));

      setSearchParams({ redirect: "my-restaurant" });
    },
  });
};

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

export const useUpdateMyRestaurantImg = () => {
  const { refreshToken } = useAuth();
  const privateApi = useAxiosPrivate();

  return useMutation<{ message: string; imageUrl: string }, ApiError, File>({
    mutationKey: ["updateMyRestaurantImg"],
    mutationFn: (data) => updateMyRestaurantImg(privateApi, data),
    onSuccess: () => refreshToken(),
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

export const useDeleteOrder = (orderId: string) => {
  const privateApi = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, ApiError>({
    mutationKey: ["deleteOrder"],
    mutationFn: () => deleteOrder(privateApi, orderId),
    onSuccess: () =>
      queryClient.removeQueries({
        queryKey: ["restaurantOrder", orderId],
        exact: true,
      }),
  });
};
