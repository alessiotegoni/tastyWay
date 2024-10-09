import { AxiosError } from "axios";
import { CartItem } from "@/contexts/CartContext";

export type ApiError = AxiosError<{ message: string }>;

export type AuthRes = string;

export type LogoutRes = { message: string };

export type CheckoutSessionBody = {
  restaurantId: string;
  items: Partial<CartItem>[];
  restaurantName: string;
  deliveryPrice: number;
  address: string;
};
