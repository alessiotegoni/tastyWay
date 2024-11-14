import { CartContext } from "@/contexts/CartContext";
import { RestaurantItem } from "@/types/restaurantTypes";
import { useContext } from "react";

export type RestaurantCartItem = Omit<
  RestaurantItem,
  "description" | "type"
> & {
  quantity: number;
};

export const useCart = (
  restaurantItems?: RestaurantItem[],
  restaurantId?: string
) => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("To use useCart hook you must be inside of CartProvider");
  }

  const cartItemIds = restaurantId ? context.cartItems[restaurantId] ?? [] : [];

  const itemCount = cartItemIds.reduce<{ [key: string]: number }>(
    (acc, itemId) => {
      acc[itemId] = (acc[itemId] || 0) + 1;
      return acc;
    },
    {}
  );

  const restaurantCartItems =
    restaurantItems
      ?.filter((i) => restaurantId && cartItemIds.includes(i._id))
      .map(({ _id, name, img, price }) => ({
        _id,
        name,
        img,
        price,
        quantity: itemCount[_id] || 0,
      })) ?? [];

  return { ...context, restaurantCartItems };
};
