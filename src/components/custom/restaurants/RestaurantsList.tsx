import { RestaurantsRes } from "@/types/restaurantTypes";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import RestaurantItem from "./RestaurantItem";
import RestaurantSkeleton from "@/components/skeletons/RestaurantSkeleton";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { AxiosError } from "axios";

interface RestaurantsListProps {
  data: InfiniteData<RestaurantsRes> | undefined;
  error: AxiosError<unknown, any> | null;
  isFetching: boolean;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<RestaurantsRes>>
  >;
}

const RestaurantsList = ({
  data,
  error,
  isFetching,
  fetchNextPage,
}: RestaurantsListProps) => {
  const { inView, ref } = useInView({ triggerOnce: true, threshold: 0.5 });

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
    if (inView && !isFetching && !error) fetchNextPage();
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
