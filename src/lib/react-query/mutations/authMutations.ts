import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  forgotPassword,
  googleAuth,
  logout,
  resetPassword,
  sendVerificationEmail,
  signin,
  signup,
  verifyEmail,
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
import useAxiosPrivate from "@/hooks/usePrivateApi";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { errorToast } from "@/lib/utils";
import useAddress from "@/hooks/useAddress";

export const useGoogleAuth = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthRes, ApiError, GoogleLoginBody>({
    mutationKey: ["googleLogin"],
    mutationFn: googleAuth,
    onSuccess: (accessToken) =>
      queryClient.setQueryData(["accessToken"], () => accessToken),
    onError: (err) =>
      errorToast({
        err,
        description: "Errore nel login, riprovare",
      }),
  });
};

export const useSignin = () => {
  const queryClient = useQueryClient();

  // Il primo e' la risposta dall'api, il secondo e' l'errore
  // il terzo sono i dati passati all'api

  return useMutation<AuthRes, ApiError, SigninType>({
    mutationKey: ["signin"],
    mutationFn: signin,
    onSuccess: (accessToken) => {
      queryClient.setQueryData(["accessToken"], () => accessToken),
        toast({ title: "Accesso effetuato con successo" });
    },
    onError: (err) =>
      errorToast({
        err,
      }),
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthRes, ApiError, SignupType>({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: (accessToken) => {
      queryClient.setQueryData(["accessToken"], () => accessToken),
        toast({ description: "Registrazione effettuata con successo" });
    },
    onError: (err) => errorToast({ err }),
  });
};

export const useLogout = () => {
  const { removeSelectedAddress } = useAddress();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<LogoutRes, ApiError>({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["accessToken"], () => null);
      googleLogout();
      removeSelectedAddress();
      toast({ description: "Logout effettuato con successo!" });
      navigate("/");
    },
  });
};

export const useSendVerificationEmail = () => {
  const privateApi = useAxiosPrivate();
  const navigate = useNavigate();

  const mutation = useMutation<ApiRes, ApiError>({
    mutationKey: ["sendVerificationEmail"],
    mutationFn: () => sendVerificationEmail(privateApi),
    onSuccess: ({ message }) => {
      toast({ description: message });
      navigate("/verify-email");
    },
    onError: () =>
      errorToast({
        description: "Errore nell'invio della email di verifica",
      }),
  });

  const sendEmail = async () =>
    !mutation.isPending && (await mutation.mutateAsync());

  return { sendEmail, ...mutation };
};

export const useVerifyEmail = () => {
  const { refreshToken } = useAuth();

  const privateApi = useAxiosPrivate();
  const navigate = useNavigate();

  return useMutation<ApiRes, ApiError, string>({
    mutationKey: ["verifyEmail"],
    mutationFn: (code) => verifyEmail(privateApi, code),
    onSuccess: ({ message }) => {
      refreshToken();
      toast({ description: message });
      navigate(-1);
    },
    onError: (err) =>
      errorToast({
        err,
      }),
  });
};

export const useForgotPassword = () =>
  useMutation<ApiRes, ApiError, string>({
    mutationKey: ["forgotPassword"],
    mutationFn: (email) => forgotPassword(email),
    onSuccess: ({ message }) => toast({ description: message }),
    onError: (err) =>
      errorToast({
        err,
        description:
          "Errore nell'invio della email per il reset della password",
      }),
  });

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation<ApiRes, ApiError, ResetPasswordBody>({
    mutationKey: ["resetPassword"],
    mutationFn: (data) => resetPassword(data),
    onSuccess: ({ message }) => {
      toast({ description: message });
      navigate("/signin");
    },
    onError: (err) =>
      errorToast({
        err,
        description: "Errore nel reset della password, riprovare",
      }),
  });
};
