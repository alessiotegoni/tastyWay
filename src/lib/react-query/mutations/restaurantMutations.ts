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
import { ApiError, ApiRes } from "@/types/apiTypes";
import { OrderStatus, RestaurantUserOrder } from "@/types/restaurantTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { errorToast } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ChangeEvent } from "react";

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
    onError: (err) =>
      errorToast({
        err,
        description: "Errore nella creazione del ristorante",
      }),
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
    onSuccess: ({ message }, variables) => {
      if (restaurantName !== form.getValues("name")) refreshToken();

      queryClient.setQueryData(["myRestaurant"], () => variables);

      toast({
        description: message,
      });
    },
    onError: (err) =>
      errorToast({
        err,
        description: "Errore nell'aggiornamento del ristorante",
      }),
  });
};

export const useUpdateMyRestaurantImg = () => {
  const privateApi = useAxiosPrivate();
  const { refreshToken } = useAuth();

  const mutation = useMutation<ApiRes, ApiError, File>({
    mutationKey: ["updateMyRestaurantImg"],
    mutationFn: (img) => updateMyRestaurantImg(privateApi, img),
    onSuccess: ({ message }) => {
      refreshToken();
      toast({
        description: message,
      });
    },
    onError: (err) =>
      errorToast({
        err,
        description: "Errore nel caricamento dell'immagine",
      }),
  });

  const handleUploadImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (!file || mutation.isPending) return;

    await mutation.mutateAsync(file);
  };

  return { handleUploadImg, ...mutation };
};

export const useUpdateOrderStatus = (orderId: string) => {
  const privateApi = useAxiosPrivate();
  const queryClient = useQueryClient();

  const mutation = useMutation<{ message: string }, ApiError, OrderStatus>({
    mutationKey: ["updateOrderStatus"],
    mutationFn: (orderStatus) =>
      updateOrderStatus(privateApi, orderId, { status: orderStatus }),
    onSuccess: ({ message }, orderStatus) => {
      queryClient.setQueryData<RestaurantUserOrder>(
        ["restaurantOrder", orderId],
        (order) => ({
          ...order!,
          status: orderStatus,
        })
      ),
        toast({ description: message });
    },
    onError: (err) =>
      errorToast({
        err,
        description: "Errore nell'aggiornamento dello stato dell'ordine",
      }),
  });

  const handleUpdateOrderStatus = async (
    selectedStatus: OrderStatus,
    currentStatus: OrderStatus
  ) => {
    if (selectedStatus !== currentStatus && !mutation.isPending)
      mutation.mutateAsync(selectedStatus);
  };

  return { handleUpdateOrderStatus, ...mutation };
};

export const useDeleteOrder = (orderId: string) => {
  const privateApi = useAxiosPrivate();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation<{ message: string }, ApiError>({
    mutationKey: ["deleteOrder"],
    mutationFn: () => deleteOrder(privateApi, orderId),
    onSuccess: ({ message }) => {
      queryClient.removeQueries({
        queryKey: ["restaurantOrder", orderId],
        exact: true,
      }),
        toast({ description: message });
      navigate("/active-orders");
    },
    onError: (err) =>
      errorToast({ err, description: "Errore nell'eliminazione dell'ordine" }),
  });

  const handleDeleteOrder = async () =>
    !mutation.isPending && mutation.mutateAsync();

  return { handleDeleteOrder, ...mutation };
};
