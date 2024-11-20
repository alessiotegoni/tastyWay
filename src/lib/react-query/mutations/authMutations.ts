import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  forgotPassword,
  googleAuth,
  logout,
  resetPassword,
  signin,
  signup,
} from "@/lib/api/authApi";
import { SigninType, SignupType } from "@/lib/validations/authSchemas";
import {
  ApiError,
  ApiRes,
  AuthRes,
  GoogleLoginBody,
  LogoutRes,
  ResetPasswordBody,
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

export const useForgotPassword = () =>
  useMutation<ApiRes, ApiError, string>({
    mutationKey: ["forgotPassword"],
    mutationFn: (email) => forgotPassword(email),
  });

export const useResetPassword = () =>
  useMutation<ApiRes, ApiError, ResetPasswordBody>({
    mutationKey: ["resetPassword"],
    mutationFn: (data) => resetPassword(data),
  });
