import { RestaurantsRes, RestaurantsType } from "@/types/restaurantTypes";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import RestaurantItem from "./RestaurantItem";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { RESTAURANTS_LIMIT } from "@/config/apiConfig";

interface RestaurantsListProps {
  restaurants: RestaurantsType[];
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<RestaurantsRes>>
  >;
  hasNextPage: boolean;
}

const RestaurantsList = ({
  restaurants,
  fetchNextPage,
  hasNextPage,
}: RestaurantsListProps) => {
  const { inView, ref } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  return restaurants.map((r, i) => (
    <RestaurantItem
      key={r._id}
      restaurant={r}
      observerRef={
        i >= RESTAURANTS_LIMIT && i === restaurants.length - 2 ? ref : undefined
      }
    />
  ));
};
export default RestaurantsList;
