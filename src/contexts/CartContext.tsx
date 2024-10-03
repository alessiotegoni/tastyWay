import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { RestaurantItem } from "@/types/restaurantTypes";
import { addCartItem, removeCartItem } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export type CartItem = {
  qnt: number;
} & Omit<RestaurantItem, "description">;

export type CartItemType = {
  restaurantId: string;
  items: CartItem[];
};

type AddCartItemParams = {
  type: "ADD";
  name: string;
  img: string;
  price: number;
};

type RemoveCartItemParams = {
  type: "REMOVE";
};

type HandleSetCartParams = {
  restaurantId: string;
  itemId: string;
} & (AddCartItemParams | RemoveCartItemParams);

interface CartContextValues {
  cartItems: CartItemType[];
  handleSetCart: (params: HandleSetCartParams) => void;
}

export const CartContext = createContext<CartContextValues | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const storedCartItems: CartItemType[] =
    JSON.parse(localStorage.getItem("cartItems")!) ?? [];

  const [cartItems, setCartItems] = useState(storedCartItems);

  const handleSetCart = (params: HandleSetCartParams) => {
    const { restaurantId, itemId, type } = params;

    console.log(cartItems);

    const itemIndex = cartItems.findIndex(
      (ci) => ci.restaurantId === restaurantId
    );

    const cartItem = itemIndex === -1 ? undefined : cartItems.at(itemIndex);

    let newItems = [...cartItems];

    if (type === "ADD") {
      const { name, img, price } = params;
      const defaultItem = { _id: itemId, name, img, price, qnt: 1 };

      if (!cartItem) {
        newItems = addCartItem({
          restaurantId,
          itemId,
          defaultItem,
          cartItems,
        });
      } else {
        newItems = addCartItem({
          itemId,
          defaultItem,
          cartItem,
          cartItems,
          cartItemIndex: itemIndex,
        });
      }
    }

    if (type === "REMOVE" && cartItem) {
      newItems = removeCartItem({ itemId, itemIndex, cartItem, cartItems });
    }

    try {
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      setCartItems(newItems);
      console.log(newItems);
    } catch (err) {
      toast({
        title: "Errore",
        description: "Troppi elementi nel carrello, eliminarne alcuni",
        variant: "destructive",
      });
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, handleSetCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
