import RestaurantListItem from "./RestaurantListItem";
import { RestaurantItem } from "@/types/restaurantTypes";
import RestaurantItemSkeleton from "@/components/skeletons/RestaurantItemSkeleton";

interface RestaurantItemsListProps {
  restaurantId: string | undefined;
  restaurantItems: RestaurantItem[] | undefined;
  isLoading: boolean;
}

const RestauranItemsList = ({
  restaurantId,
  restaurantItems = [],
  isLoading,
}: RestaurantItemsListProps) => {
  return (
    <ul className="restaurant__items__list">
      {isLoading && <RestaurantItemSkeleton />}
      {!isLoading &&
        !!restaurantItems.length &&
        restaurantItems.map((item) => (
          <RestaurantListItem
            key={item._id}
            item={item}
            restaurantId={restaurantId!}
          />
        ))}
    </ul>
  );
};
export default RestauranItemsList;
