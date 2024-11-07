import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { RestaurantItem } from "@/types/restaurantTypes";
import { PlusIcon } from "lucide-react";

interface RestaurantListItemProps {
  restaurantId: string;
  item: RestaurantItem;
}

const RestaurantListItem = ({
  restaurantId,
  item: { _id, name, img, description, price },
}: RestaurantListItemProps) => {
  const { handleSetCart } = useCart();

  return (
    <li className="restaurant__item restaurant-separator">
      <figure className="item__body sm:flex gap-5">
        <div
          className="item__img shrink-0 sm:w-[130px] sm:h-[130px]
         rounded-[20px] overflow-hidden xs:max-w-[200px] xs:max-h-[200px]"
        >
          <img
            src={img ?? "/imgs/default-restaurant.png"}
            alt={`${name}-img`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-1 mb-5 sm:mt-0 sm:mb-0">
          <figcaption className="text-[25px]">{name}</figcaption>
          <p className="text-[14px] sm:max-w-[280px] font-normal mt-1">
            {description}
          </p>
        </div>
      </figure>
      <div
        className="item__info flex sm:flex-col justify-between
      items-center sm:items-end"
      >
        <h2 className="text-[25px]">${price}</h2>
        <Button
          onClick={() =>
            handleSetCart({
              restaurantId,
              itemId: _id,
              name,
              img,
              price,
              type: "ADD",
            })
          }
          className="btn bg-[#ec01018a] hover:bg-[#ec0101d7]
           font-normal text-[30px] border border-[#FE0000]
           w-[50px] h-[50px] rounded-full"
        >
          <PlusIcon />
        </Button>
      </div>
    </li>
  );
};
export default RestaurantListItem;
