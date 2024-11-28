import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/usePrivateApi";
import { ApiError, ApiRes, CheckoutSessionBody } from "@/types/apiTypes";
import {
  createCheckoutSessionUrl,
  updateUserImg,
  updateUserProfile,
  updateUserSecurity,
} from "@/lib/api/userApi";
import { UserProfileType } from "@/lib/validations/userProfileSchema";
import { useAuth } from "@/contexts/AuthContext";
import { errorToast } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ChangeEvent } from "react";

export const useCreateCheckoutSession = () => {
  const privateApi = useAxiosPrivate();

  return useMutation<string, ApiError, CheckoutSessionBody>({
    mutationKey: ["checkoutSessionUrl"],
    mutationFn: (data) => createCheckoutSessionUrl(data, privateApi),
    onError: (err) =>
      errorToast({
        err,
        description: "Errore nel redirect alla pagina di pagamento",
      }),
  });
};

export const useUpdateUserProfile = () => {
  const privateApi = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<ApiRes, ApiError, UserProfileType>({
    mutationKey: ["updateUserProfile"],
    mutationFn: (data) => updateUserProfile(privateApi, data),
    onSuccess: (_, variables) =>
      queryClient.setQueryData(["userProfile"], () => variables),
    onError: (err) =>
      errorToast({
        err,
        description: "Errore nell'aggiornamento dell'utente",
      }),
  });
};

export const useUpdateUserSecurity = (isGoogleLogged: boolean) => {
  const privateApi = useAxiosPrivate();
  const { refreshToken } = useAuth();

  return useMutation<
    ApiRes,
    ApiError,
    { newPassword: string; oldPassword: string }
  >({
    mutationKey: ["updateUserSecurity"],
    mutationFn: (data) => updateUserSecurity(privateApi, data),
    onSuccess: () => {
      refreshToken();
      toast({
        description: `Password ${
          isGoogleLogged ? "creata" : "modificata"
        } con successo`,
      });
    },
    onError: (err) =>
      errorToast({
        err,
        description: "Errore nell'aggiornamento della password",
      }),
  });
};

export const useUpdateUserImg = () => {
  const privateApi = useAxiosPrivate();
  const { refreshToken } = useAuth();

  const mutation = useMutation<ApiRes, ApiError, File>({
    mutationKey: ["updateUserImg"],
    mutationFn: (img) => updateUserImg(privateApi, img),
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
