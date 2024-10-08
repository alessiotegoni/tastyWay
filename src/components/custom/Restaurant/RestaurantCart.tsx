import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import ConfirmAddressDialog from "./ConfirmAddressDialog";

interface RestaurantCartProps {
  restaurantId: string;
  restaurantName: string;
  deliveryPrice: number;
}

const RestaurantCart = ({
  restaurantId,
  restaurantName,
  deliveryPrice,
}: RestaurantCartProps) => {
  const { restaurantCart, totalPrice, handleSetCart } = useCart(restaurantId);

  const restaurantItems = restaurantCart.map((item) => (
    <li className="item" key={item._id}>
      <div className="flex justify-center gap-2">
        <figure className="w-[50px] h-[50px] self-center">
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

  return (
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
      <ConfirmAddressDialog
        restaurantId={restaurantId}
        restaurantName={restaurantName}
        deliveryPrice={deliveryPrice}
        items={restaurantCart}
        disabled={!!!restaurantCart.length}
      />
    </>
  );
};
export default RestaurantCart;
