import { RestaurantsRes } from "@/types/restaurantTypes";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import RestaurantItem from "./RestaurantItem";
import RestaurantSkeleton from "@/components/skeletons/RestaurantSkeleton";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface RestaurantsListProps {
  data: InfiniteData<RestaurantsRes> | undefined;
  isFetching: boolean;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<RestaurantsRes>>
  >;
}

const RestaurantsList = ({
  data,
  isFetching,
  fetchNextPage,
}: RestaurantsListProps) => {
  const { inView, ref } = useInView({ triggerOnce: false, threshold: 0.5 });

  const restaurants = data?.pages.flatMap((p) => p.restaurants) ?? [];
  const skeletons = Array.from({ length: 3 }, (_, i) => (
    <RestaurantSkeleton key={i} />
  ));

  const content =
    isFetching && !data
      ? skeletons
      : restaurants.map((r, i) => (
          <RestaurantItem
            key={r._id}
            restaurant={r}
            observerRef={i === restaurants.length - 2 ? ref : undefined}
          />
        ));

  useEffect(() => {
    if (inView && !isFetching) fetchNextPage();
  }, [inView, isFetching]);

  return (
    <div
      className="primary-widget-bg border border-primary-20 min-w-[900px]
    rounded-[30px] overflow-hidden"
    >
      <ul className="restaurants__list">{content}</ul>
    </div>
  );
};
export default RestaurantsList;
