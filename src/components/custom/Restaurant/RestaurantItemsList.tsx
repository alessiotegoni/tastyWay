import { useGetRestaurantItems } from "@/lib/react-query/queries/restaurantQueries";
import RestaurantListItem from "./RestaurantListItem";
import { RestaurantItemsFilters } from "@/types/restaurantTypes";
import RestaurantItemSkeleton from "@/components/skeletons/RestaurantItemSkeleton";

interface RestaurantItemsListProps {
  restaurantId: string | undefined;
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
