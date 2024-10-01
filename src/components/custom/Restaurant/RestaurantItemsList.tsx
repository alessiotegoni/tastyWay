import { RestaurantType } from "@/types/restaurantTypes";
import RestaurantListItem from "./RestaurantListItem";

const RestauranItemsList = ({ restaurant }: { restaurant: RestaurantType }) => {
  // TODO: fetchare items a parte (creare router e controller)

  return (
    <ul className="restaurant__items__list">
      {restaurant.items.map((item, i) => (
        <RestaurantListItem key={i} item={item} />
      ))}
    </ul>
  );
};
export default RestauranItemsList;
