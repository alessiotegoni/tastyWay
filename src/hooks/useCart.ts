import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";

export const useCart = (restaurantId?: string) => {
  const context = useContext(CartContext);

  if (!context) throw new Error("Must be inside of CartProvider");

  const restaurantCart =
    context.cartItems.find((ci) => ci.restaurantId === restaurantId)?.items ??
    [];

  const totalPrice = restaurantCart.reduce(
    (total, item) => total + (item.qnt * item.price),
    0
  );

  return { ...context, restaurantCart, totalPrice };
};
