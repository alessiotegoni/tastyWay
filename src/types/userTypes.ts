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
  expectedTime: number;
  items: ActiveOrderItem[];
  totalPrice: number;
  restaurant: {
    name: string;
  };
};
