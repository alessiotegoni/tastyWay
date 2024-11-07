import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { ShoppingBasket, X } from "lucide-react";
import RestaurantCart from "./RestaurantCart";

interface RestaurantDialogProps {
  restaurantId: string;
  restaurantName: string;
  restaurantPrice: number;
}

const RestaurantCartMobileDialog = ({
  restaurantId,
  restaurantName,
  restaurantPrice,
}: RestaurantDialogProps) => {
  const { restaurantCart } = useCart(restaurantId);

  const cartItemsLength = restaurantCart.reduce(
    (acc, item) => (acc += item.qnt),
    0
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="shrink-0 md:hidden btn block sticky top-0 w-[51px] h-[51px]
backdrop-blur-3xl rounded-full bg-home-widget border border-primary-20"
        >
          <div className="relative h-full flex-center">
            <ShoppingBasket className="w-5 sm:w-10" />
            <p
              className="absolute -top-[9px] -right-[9px] sm:-top-1 sm:-right-1
text-xs w-6 h-6 flex-center bg-[#ed0000] rounded-full"
            >
              {cartItemsLength}
            </p>
          </div>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="p-0 px-3 block border-none max-w-[400px]">
        <div
          className="bg-home-widget
  border border-primary-20 backdrop-blur-[123px] rounded-[30px]
  p-5"
        >
          <RestaurantCart
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            deliveryPrice={restaurantPrice}
          />
        </div>
        <AlertDialogFooter className="flex-row justify-end mt-5">
          <AlertDialogCancel
            className="btn w-10 h-10 rounded-full
          backdrop-blur-3xl bg-[#ec01017e]
border border-x-icon-bg-70 hover:bg-[#ec0101d9]"
          >
            <X size={20} />
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default RestaurantCartMobileDialog;
