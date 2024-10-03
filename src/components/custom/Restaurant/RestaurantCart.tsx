import { Button } from "@/components/ui/button";

interface RestaurantCartProps {
  restaurantId: string;
  deliveryPrice: number;
}

const RestaurantCart = ({
  restaurantId,
  deliveryPrice,
}: RestaurantCartProps) => {

  return (
    <>
      <h1 className="text-[30px]">Il tuo ordine</h1>
      <div className="flex-between font-medium my-5">
        <h2>Consegna</h2>
        <p>${deliveryPrice}</p>
      </div>
      {/* <ul className="items__list">
        {restaurant?.items.map((item, index) => (
          <li className="item" key={item._id}>
            <div className="flex justify-center gap-2">
              <figure className="w-[50px] h-[50px] self-center">
                <img src="/imgs/default-restaurant-item.png" alt={item.name} />
              </figure>
              <div className="flex flex-col justify-between">
                <figcaption className="text-[13px] font-semibold">
                  {item.name}
                </figcaption>
                <p>{index} x</p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <h2>${item.price}</h2>
              <Button
                className="btn mt-3 text-[13px] font-semibold py-1 px-4 bg-[#ed00009b]
                      hover:bg-[#ed0000d9] border border-[#ed0000df] rounded-2xl
                      "
              >
                Elimina
              </Button>
            </div>
          </li>
        ))}
      </ul> */}
      <hr className="my-5 border-white/20" />
      <div className="flex-between">
        <h1 className="text-[25px]">Totale</h1>
        <p className="text-[30px]">${deliveryPrice}</p>
      </div>
      <Button
        className="btn mt-4 bg-[#ec01017e] w-full py-[14px]
              rounded-xl border border-x-icon-bg-70 hover:bg-[#ec0101d9]"
      >
        Checkout
      </Button>
    </>
  );
};
export default RestaurantCart;
