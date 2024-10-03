import { RestaurantType } from "@/types/restaurantTypes";
import RestaurantListItem from "./RestaurantListItem";

const RestauranItemsList = ({ restaurant }: { restaurant: RestaurantType }) => {
  // TODO: fetchare items a parte (creare router e controller)

  return (
    <ul className="restaurant__items__list">
      {restaurant.items.map((item) => (
        <RestaurantListItem
          key={item._id}
          item={item}
          restaurantId={restaurant._id}
        />
      ))}
    </ul>
  );
};
export default RestauranItemsList;
