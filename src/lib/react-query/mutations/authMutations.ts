import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout, signin, signup } from "@/lib/api/authApi";
import { SigninType, SignupType } from "@/lib/validations/authSchemas";
import { ApiError, AuthRes, LogoutRes } from "@/types/apiTypes";

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
