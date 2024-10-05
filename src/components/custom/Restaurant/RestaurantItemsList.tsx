import { useGetRestaurantItems } from "@/lib/react-query/queries";
import RestaurantListItem from "./RestaurantListItem";
import { RestaurantItemsFilters } from "@/types/restaurantTypes";

interface RestaurantItemsListProps {
  restaurantId: string;
  itemsFilters: RestaurantItemsFilters;
}

const RestauranItemsList = ({
  restaurantId,
  itemsFilters,
}: RestaurantItemsListProps) => {
  const { data, isLoading, isError, error } = useGetRestaurantItems(
    restaurantId,
    itemsFilters
  );

  const restaurantItems = data?.pages.flatMap((p) => p.restaurantItems) ?? [];

  return (
    <ul className="restaurant__items__list">
      {!!restaurantItems?.length &&
        restaurantItems.map((item) => (
          <RestaurantListItem
            key={item._id}
            item={item}
            restaurantId={restaurantId}
          />
        ))}
    </ul>
  );
};
export default RestauranItemsList;
