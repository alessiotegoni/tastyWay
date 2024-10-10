import { RestaurantItem } from "./restaurantTypes";

export interface UserJwt {
  id: string;
  email: string;
  name: string;
  surname: string;
  address: string;
  isCmpAccount: boolean;
  exp: number;
  iat: number;
}

export type UserActiveOrder = {
  id: string;
  status:
    | "In attesa"
    | "Accettato"
    | "In preparazione"
    | "In consegna"
    | "Consegnato";
  expectedTime: number;
  items: Omit<RestaurantItem, "type" | "description"> & { quantity: number };
  totalPrice: number;
  restaurant: {
    name: string;
  };
};
