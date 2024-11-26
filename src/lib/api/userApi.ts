import axios, { AxiosInstance } from "axios";

import { CheckoutSessionBody } from "@/types/apiTypes";
import { UserPrevOrderRes } from "@/types/userTypes";
import { UserProfileType } from "../validations/userProfileSchema";
import { api, PREV_ORDERS_LIMIT } from "@/config/apiConfig";

export const sendOtpCode = async (phoneNumber: string) =>
  (await api.post("/users/send-otp", { phoneNumber })).data;

export const verifyOtpCode = async (data: {
  phoneNumber: string;
  otpCode: string;
}) =>
  (
    await api.post("/users/verify-otp", {
      phoneNumber: data.phoneNumber,
      otpCode: data.otpCode,
    })
  ).data;

export const getMyAddress = async (lat: number, lng: number) => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: {
        latlng: `${lat},${lng}`,
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        language: "it",
      },
    }
  );

  const address = data?.results?.at(0) as google.maps.GeocoderResult;

  if (!address) throw new Error("Indirizzo non trovato");

  const country = address.address_components.find((ac) =>
    ac.types.includes("country")
  )?.long_name;

  if (!country || country !== "Italia")
    throw new Error("Devi essere in italia per ordinare");

  console.log(address);

  return address.formatted_address.replace(", Italia", "");
};

export const createCheckoutSessionUrl = async (
  body: CheckoutSessionBody,
  privateApi: AxiosInstance
) => {
  const { data } = await privateApi.post<string>(
    "/users/orders/create-checkout-session",
    body
  );

  return data;
};

export const getUserActiveOrdersCount = async (privateApi: AxiosInstance) =>
  (await privateApi.get("/users/active-orders-count")).data;

export const getUserActiveOrders = async (privateApi: AxiosInstance) =>
  (await privateApi.get("/users/active-orders")).data;

export const getUserPrevOrders = async (
  privateApi: AxiosInstance,
  pageParam: unknown
) => {
  const { data } = await privateApi.get<UserPrevOrderRes>(`/users/orders`, {
    params: {
      pageParam,
      limit: PREV_ORDERS_LIMIT,
    },
  });

  return data;
};

export const getUserProfile = async (privateApi: AxiosInstance) =>
  (await privateApi.get<UserProfileType>("/users/profile")).data;

export const updateUserProfile = async (
  privateApi: AxiosInstance,
  data: UserProfileType
) => (await privateApi.patch<{ message: string }>("/users/profile", data)).data;

export const updateUserSecurity = async (
  privateApi: AxiosInstance,
  data: { newPassword: string; oldPassword: string }
) =>
  (await privateApi.patch<{ message: string }>("/users/profile/security", data))
    .data;

export const updateUserImg = async (privateApi: AxiosInstance, userImg: File) =>
  (
    await privateApi.patch(
      "/users/profile-img",
      { userImg },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
  ).data;
