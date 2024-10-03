import { ReactNode, useContext, useState } from "react";
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

type HandleSetCartParams = {
  restaurantId: string;
  itemId: string;
  name: string;
  img: string;
  price: number;
  type: "ADD" | "REMOVE";
};

interface CartContextValues {
  cartItems: CartItemType[];
  handleSetCart: ({
    restaurantId,
    itemId,
    name,
    img,
    price,
    type,
  }: HandleSetCartParams) => void;
}

const CartContext = createContext<CartContextValues | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const storedCartItems: CartItemType[] =
    JSON.parse(localStorage.getItem("cartItems")!) ?? [];

  const [cartItems, setCartItems] = useState(storedCartItems);

  const handleSetCart = ({
    restaurantId,
    itemId,
    name,
    img,
    price,
    type,
  }: HandleSetCartParams) => {
    console.log(cartItems);

    const itemIndex = cartItems.findIndex(
      (ci) => ci.restaurantId === restaurantId
    );

    const cartItem = itemIndex === -1 ? undefined : cartItems.at(itemIndex);

    let newItems = [...cartItems];
    const defaultItem = { _id: itemId, name, img, price, qnt: 1 };

    if (!cartItem && type === "ADD")
      newItems = addCartItem({
        restaurantId,
        itemId,
        defaultItem,
        cartItems,
      });

    if (cartItem && type === "ADD")
      newItems = addCartItem({ itemId, defaultItem, cartItem, cartItems });

    if (cartItem && type === "REMOVE")
      newItems = removeCartItem({ itemId, itemIndex, cartItem, cartItems });

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

export const useCart = (restaurantId: string) => {
  const context = useContext(CartContext);

  if (!context) throw new Error("Must be inside of CartProvider");

  const restaurantCart =
    context.cartItems.find((ci) => ci.restaurantId === restaurantId)?.items ??
    [];

  console.log(restaurantCart);

  return { ...context, restaurantCart };
};
