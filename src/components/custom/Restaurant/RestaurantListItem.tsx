import { Button } from "@/components/ui/button";
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
  const itemImg = "/imgs/default-restaurant.png";


  return (
    <li className="restaurant__item restaurant-separator">
      <div className="item__body flex gap-5">
        <figure className="item__img">
          <img
            src={itemImg}
            alt={`${name}-img`}
            className="w-[130px] h-[130px] object-cover rounded-[20px]"
          />
        </figure>
        <div className="">
          <figcaption className="text-[25px]">{name}</figcaption>
          <p className="text-[14px] max-w-[280px] font-normal mt-1">
            {description}
          </p>
        </div>
      </div>
      <div className="item__info flex flex-col justify-between">
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
