import { RestaurantsRes } from "@/types/restaurantTypes";
import { InfiniteData } from "@tanstack/react-query";
import RestaurantItem from "./RestaurantItem";

interface RestaurantsListProps {
  data: InfiniteData<RestaurantsRes>;
}

const RestaurantsList = ({ data }: RestaurantsListProps) => {
  const restaurants = data.pages.flatMap((p) => p.restaurants);

  return (
    <div className="primary-widget-bg w-[900px]
    rounded-[30px]">
      <ul className="max-h-[450px] overflow-auto p-4 flex flex-col gap-4">
        {restaurants.map((r) => (
          <RestaurantItem key={r._id} restaurant={r} />
        ))}
      </ul>
    </div>
  );
};
export default RestaurantsList;
