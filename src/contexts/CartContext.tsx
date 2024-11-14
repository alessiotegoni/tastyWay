import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";

export type CartItemType = {
  [restaurantId: string]: string[];
};

export type HandleSetCartParams = {
  type: "ADD" | "REMOVE";
  restaurantId: string;
  itemId?: string;
  itemsIds?: string[];
};

interface CartContextValues {
  cartItems: CartItemType;
  handleSetCart: (params: HandleSetCartParams) => void;
}

export const CartContext = createContext<CartContextValues | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const storedCartItems: CartItemType =
    JSON.parse(localStorage.getItem("cartItems")!) ?? {};

  const [cartItems, setCartItems] = useState(storedCartItems);

  const removeStoredItems = () => localStorage.removeItem("cartItems");

  useEffect(() => {
    if (user?.isCmpAccount) removeStoredItems();
  }, [cartItems, user]);

  const handleSetCart = ({
    restaurantId,
    itemId,
    itemsIds,
    type,
  }: HandleSetCartParams) => {
    let newItems = { ...cartItems };
    const restaurantItems = newItems[restaurantId];

    if (type === "ADD") {
      if (itemId) newItems[restaurantId] = [...(restaurantItems ?? []), itemId];
      else if (itemsIds?.length) {
        newItems[restaurantId] = itemsIds;
      }
    }

    if (type === "REMOVE" && restaurantItems?.length) {
      if (itemId) {
        const itemIndex = restaurantItems.findIndex((id) => id === itemId);

        if (itemIndex === -1) return;

        newItems[restaurantId] = restaurantItems.toSpliced(itemIndex, 1);
      } else {
        newItems[restaurantId] = [];
      }
      if (!newItems[restaurantId].length) delete newItems[restaurantId];
      if (!Object.keys(newItems).length) removeStoredItems();
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
