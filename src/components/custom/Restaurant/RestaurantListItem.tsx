import { Button } from "@/components/ui/button";
import { RestaurantItem } from "@/types/restaurantTypes";
import { PlusIcon } from "lucide-react";

const RestaurantListItem = ({ item }: { item: RestaurantItem }) => {
  const itemImg = "/imgs/default-restaurant.png";

  return (
    <li className="restaurant__item restaurant-separator">
      <div className="item__body flex gap-5">
        <figure className="item__img">
          <img
            src={itemImg}
            alt={`${item.name}-img`}
            className="w-[130px] h-[130px] object-cover rounded-[20px]"
          />
        </figure>
        <div className="">
          <figcaption className="text-[25px]">{item.name}</figcaption>
          <p className="text-[14px] max-w-[280px] font-normal mt-1">
            {item.description}
          </p>
        </div>
      </div>
      <div className="item__info flex flex-col justify-between">
        <h2 className="text-[25px]">{item.price}$</h2>
        <Button
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
