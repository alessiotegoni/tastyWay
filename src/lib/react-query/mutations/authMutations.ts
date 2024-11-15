import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { googleAuth, logout, signin, signup } from "@/lib/api/authApi";
import { SigninType, SignupType } from "@/lib/validations/authSchemas";
import {
  ApiError,
  AuthRes,
  GoogleLoginBody,
  LogoutRes,
} from "@/types/apiTypes";
import { googleLogout } from "@react-oauth/google";

export const useGoogleAuth = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthRes, ApiError, GoogleLoginBody>({
    mutationKey: ["googleLogin"],
    mutationFn: googleAuth,
    onSuccess: (accessToken) =>
      queryClient.setQueryData(["accessToken"], () => accessToken),
  });
};

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
      googleLogout();
      navigate("/");
    },
  });
};
