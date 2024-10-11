import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCheckoutSessionUrl, logout, signin, signup } from "../api/api";
import {
  ApiError,
  AuthRes,
  CheckoutSessionBody,
  LogoutRes,
} from "../../types/apiTypes";
import { SigninType, SignupType } from "../validations/authSchemas";
import useAxiosPrivate from "@/hooks/usePrivateApi";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return useMutation<LogoutRes, ApiError>({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["accessToken"], () => null);
      navigate("/");
    },
  });
};

export const useCreateCheckoutSession = () => {
  const privateApi = useAxiosPrivate();

  return useMutation<string, ApiError, CheckoutSessionBody>({
    mutationKey: ["checkoutSessionUrl"],
    mutationFn: (data) => createCheckoutSessionUrl(data, privateApi),
  });
};
