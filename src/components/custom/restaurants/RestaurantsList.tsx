import { RestaurantsRes } from "@/types/restaurantTypes";
import { InfiniteData } from "@tanstack/react-query";
import RestaurantItem from "./RestaurantItem";
import RestaurantSkeleton from "@/components/skeletons/RestaurantSkeleton";

interface RestaurantsListProps {
  data: InfiniteData<RestaurantsRes> | undefined;
  isFetching: boolean;
}

const RestaurantsList = ({ data, isFetching }: RestaurantsListProps) => {

  const restaurants = data?.pages.flatMap((p) => p.restaurants) ?? [];
  const skeletons = Array.from({ length: 3 }, (_, i) => (
    <RestaurantSkeleton key={i} />
  ));

  const content =
    isFetching && !data
      ? skeletons
      : restaurants.map((r) => <RestaurantItem key={r._id} restaurant={r} />);

  return (
    <div
      className="primary-widget-bg border border-primary-30 w-[900px]
    rounded-[30px] overflow-hidden"
    >
      <ul className="restaurants__list">{content}</ul>
    </div>
  );
};
export default RestaurantsList;
