import { RestaurantsRes } from "@/types/restaurantTypes";
import { InfiniteData } from "@tanstack/react-query";
import RestaurantItem from "./RestaurantItem";

interface RestaurantsListProps {
  data: InfiniteData<RestaurantsRes>;
}

const RestaurantsList = ({ data }: RestaurantsListProps) => {
  const restaurants = data.pages.flatMap((p) => p.restaurants);

  return restaurants.map((r) => <RestaurantItem key={r._id} restaurant={r} />);
};
export default RestaurantsList;
