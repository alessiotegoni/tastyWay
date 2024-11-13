import { ReactNode, useState } from "react";
import { createContext } from "react";
import { toast } from "@/hooks/use-toast";

export type CartItemType = {
  [restaurantId: string]: string[];
};

export type HandleSetCartParams = {
  type: "ADD" | "REMOVE";
  restaurantId: string;
  itemId: string;
};

interface CartContextValues {
  cartItems: CartItemType;
  handleSetCart: (params: HandleSetCartParams) => void;
}

export const CartContext = createContext<CartContextValues | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const storedCartItems: CartItemType =
    JSON.parse(localStorage.getItem("cartItems")!) ?? {};

  const [cartItems, setCartItems] = useState(storedCartItems);

  const handleSetCart = ({
    restaurantId,
    itemId,
    type,
  }: HandleSetCartParams) => {
    let newItems = { ...cartItems };
    const restaurantItems = newItems[restaurantId];

    if (type === "ADD")
      newItems[restaurantId] = [...(restaurantItems ?? []), itemId];

    if (type === "REMOVE" && restaurantItems?.length) {
      const itemIndex = restaurantItems.findIndex((id) => id === itemId);

      if (itemIndex === -1) return;

      newItems[restaurantId] = restaurantItems.toSpliced(itemIndex, 1);

      if (!newItems[restaurantId].length) delete newItems[restaurantId];
      if (!Object.keys(newItems).length) localStorage.removeItem("cartItems");
    }

    try {
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      setCartItems(newItems);
    } catch (err) {
      toast({
        title: "Errore",
        description:
          "Impossibile settare il carrello, puilire le cache del browser",
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
