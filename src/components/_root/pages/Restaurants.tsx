import RestaurantsList from "@/components/custom/restaurants/RestaurantsList";
import FiltersPopover from "@/components/shared/FiltersPopover";
import Navbar from "@/components/shared/Navbar/Navbar";
import RestaurantSkeleton from "@/components/skeletons/RestaurantSkeleton";
import ErrorWidget from "@/components/widgets/ErrorWidget";
import RestaurantsWidget from "@/components/widgets/RestaurantsWidget";
import { useAddress } from "@/contexts/AddressContext";
import { useRestaurantFilters } from "@/contexts/RestaurantFiltersContext";
import { useGetRestaurants } from "@/lib/react-query/queries";
import { getInvalidAddressProps, getNoRestaurantsProps } from "@/lib/utils";
import { useEffect } from "react";

const Restaurants = () => {
  const { selectedAddress, removeSelectedAddress } = useAddress();

  const { filters, removeFilters } = useRestaurantFilters();

  const { data, error, isError, isFetching, fetchNextPage } = useGetRestaurants(
    selectedAddress,
    filters
  );

  useEffect(() => {
    return () => removeFilters();
  }, []);

  const invalidAddressErrProps = getInvalidAddressProps(
    removeSelectedAddress,
    error
  );

  const noRestaurantsErrProps = getNoRestaurantsProps(
    removeFilters,
    removeSelectedAddress
  );

  const restaurants = data?.pages.flatMap((p) => p.restaurants) ?? [];

  const noRestaurantsFound = !!!restaurants.length && !isFetching && !isError;
  const canShowRestaurants = !isError && (isFetching || !!restaurants.length);

  return (
    <section className="all-restaurants">
      <img
        src="/imgs/restaurants-bg.png"
        alt="restaurants-bg-img"
        className="bg-img"
      />
      <Navbar pageNum={3} />
      <main className="flex flex-col items-center gap-3">
        <RestaurantsWidget />
        {noRestaurantsFound && <ErrorWidget {...noRestaurantsErrProps} />}
        {isError && <ErrorWidget {...invalidAddressErrProps} />}
        {canShowRestaurants && (
          <>
            <FiltersPopover />
            <div
              className="primary-widget-bg border border-primary-20 min-w-[900px]
        rounded-[30px] overflow-hidden"
            >
              <ul className="restaurants__list">
                {isFetching && !!!restaurants.length ? (
                  Array.from({ length: 5 }, (_, i) => (
                    <RestaurantSkeleton key={i} />
                  ))
                ) : (
                  <RestaurantsList
                    restaurants={restaurants}
                    // isFetching={isFetching}
                    fetchNextPage={fetchNextPage}
                  />
                )}
              </ul>
            </div>
          </>
        )}
      </main>
    </section>
  );
};
export default Restaurants;
