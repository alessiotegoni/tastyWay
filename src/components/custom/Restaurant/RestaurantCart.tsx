import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShoppingBasket, X } from "lucide-react";

interface RestaurantCartProps {
  restaurantId: string;
  deliveryPrice: number;
  openCAD: () => void;
}

const RestaurantCart = ({
  restaurantId,
  deliveryPrice,
  openCAD,
}: RestaurantCartProps) => {
  const { restaurantCart, totalPrice, handleSetCart } = useCart(restaurantId);

  const restaurantItems = restaurantCart.map((item) => (
    <li className="item" key={item._id}>
      <div className="flex justify-center gap-2">
        <figure className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] self-center">
          <img
            src={item.img ?? "/imgs/default-restaurant-item.png"}
            alt={item.name}
          />
        </figure>
        <div className="flex flex-col justify-between">
          <figcaption className="text-[13px] font-semibold">
            {item.name}
          </figcaption>
          <p>{item.qnt} x</p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <h2>${item.price}</h2>
        <Button
          onClick={() =>
            handleSetCart({ restaurantId, itemId: item._id, type: "REMOVE" })
          }
          className="btn mt-3 text-[13px] font-semibold py-1 px-4 bg-[#ed00009b]
              hover:bg-[#ed0000d9] border border-[#ed0000df] rounded-2xl
              "
        >
          Elimina
        </Button>
      </div>
    </li>
  ));

  const cartInfo = (
    <>
      <h1 className="text-[30px]">Il tuo ordine</h1>
      <div className="flex-between font-medium my-5">
        <h2>Consegna</h2>
        <p>${deliveryPrice}</p>
      </div>
      {!!restaurantCart.length && (
        <ul className="items__list">{restaurantItems}</ul>
      )}
      <hr className="my-5 border-white/20" />
      <div className="flex-between">
        <h1 className="text-[25px]">Totale</h1>
        <p className="text-[30px]">${totalPrice + deliveryPrice}</p>
      </div>
      <Button
        onClick={() => openCAD()}
        className="btn mt-4 bg-[#ec01017e] w-full py-[14px]
        rounded-xl border border-x-icon-bg-70 hover:bg-[#ec0101d9]"
        disabled={!restaurantCart.length}
      >
        Checkout
      </Button>
    </>
  );

  const mobileDialog = (
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
              {restaurantCart.reduce((acc, item) => (acc += item.qnt), 0)}
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
          {cartInfo}
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

  return (
    <>
      <div className="md:hidden">{mobileDialog}</div>
      <div className="hidden md:block">{cartInfo}</div>
    </>
  );
};
export default RestaurantCart;
