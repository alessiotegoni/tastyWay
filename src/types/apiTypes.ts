import { AxiosError } from "axios";
import { UserGoogleJwt } from "./userTypes";

export type ApiError = AxiosError<{ message: string }>;

export type ApiRes = { message: string };
export type AuthRes = string;
export type LogoutRes = { message: string };

export type CheckoutSessionBody = {
  restaurantId: string;
  itemsIds: string[];
  address: string;
};

export type GoogleLoginBody =
  | { access_token: string }
  | {
      userData: Pick<
        UserGoogleJwt,
        "email" | "given_name" | "family_name" | "picture"
      >;
    };

export type ResetPasswordBody = {
  newPassword: string;
  email: string
  token: string;
};
