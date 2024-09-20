import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout, signin, signup } from "../api/api";
import { ApiError, AuthRes, LogoutRes } from "../../types/apiTypes";
import { SigninType, SignupType } from "../validations/authSchemas";

export const useSignin = () => {
  const queryClient = useQueryClient();

  // Il primo e' la risposta dall'api, il secondo e' l'errore
  // il terzo sono i dati passati all'api

  return useMutation<AuthRes, ApiError, SigninType>({
    mutationKey: ["signin"],
    mutationFn: signin,
    onSuccess: (accessToken) =>
      queryClient.setQueryData(["accessToken"], () => accessToken),
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthRes, ApiError, SignupType>({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: (accessToken) =>
      queryClient.setQueryData(["accessToken"], () => accessToken),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<LogoutRes, ApiError>({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => queryClient.setQueryData(["accessToken"], () => null),
  });
};
