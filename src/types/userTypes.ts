import { OrderItem } from "./restaurantTypes";

export interface UserJwt {
  id: string;
  email: string;
  restaurantName?: string;
  imageUrl?: string;
  name: string;
  surname: string;
  address: string;
  isCmpAccount: boolean;
  createdAt: string;
  exp: number;
  iat: number;
}

export interface UserGoogleJwt {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

export type OrderStatus =
  | "In attesa"
  | "Accettato"
  | "In preparazione"
  | "In consegna"
  | "Consegnato";

export type ActiveOrderItem = {
  _id: string;
  name: string;
  type: string;
  price: number;
  img: string;
  quantity: number;
};

export type UserActiveOrder = {
  id: string;
  status: OrderStatus;
  expectedTime: string;
  items: ActiveOrderItem[];
  address: string;
  totalPrice: number;
  restaurant: {
    name: string;
  };
};

export type UserPrevOrder = {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt: string;
  restaurant: {
    id: string;
    name: string;
    img: string;
  };
};

export type UserPrevOrderRes = {
  nextCursor: string | null;
  orders: UserPrevOrder[];
};
