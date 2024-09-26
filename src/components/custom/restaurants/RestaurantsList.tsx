import { RestaurantsRes, RestaurantsType } from "@/types/restaurantTypes";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import RestaurantItem from "./RestaurantItem";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface RestaurantsListProps {
  restaurants: RestaurantsType[];
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<RestaurantsRes>>
  >;
}

const RestaurantsList = ({
  restaurants,
  fetchNextPage,
}: RestaurantsListProps) => {
  const { inView, ref } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return restaurants.map((r, i) => (
    <RestaurantItem
      key={r._id}
      restaurant={r}
      observerRef={i === restaurants.length - 2 ? ref : undefined}
    />
  ));
};
export default RestaurantsList;
