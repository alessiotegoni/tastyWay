import { api } from "@/config/apiConfig";
import { SigninType, SignupType } from "../validations/authSchemas";
import { GoogleLoginBody, ResetPasswordBody } from "@/types/apiTypes";

export const googleAuth = async (data: GoogleLoginBody) =>
  (await api.post("/auth/google", data)).data;

export const signin = async (data: SigninType) =>
  (await api.post("/auth/signin", data)).data;

export const signup = async (data: SignupType) =>
  (await api.post("/auth/signup", data)).data;

export const refreshToken = async () => (await api.get("/auth/refresh")).data;

export const logout = async () => (await api.delete("/auth/logout")).data;

export const forgotPassword = async (email: string) =>
  (await api.post("/auth/forgot-password", { email })).data;

export const resetPassword = async (data: ResetPasswordBody) =>
  (await api.post("/auth/reset-password", data)).data;
