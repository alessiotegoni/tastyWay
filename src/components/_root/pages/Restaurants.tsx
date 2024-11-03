import RestaurantsList from "@/components/custom/restaurants/RestaurantsList";
import FiltersPopover from "@/components/shared/FiltersPopover";
import Navbar from "@/components/shared/Navbar/Navbar";
import RestaurantSkeleton from "@/components/skeletons/RestaurantSkeleton";
import ErrorWidget from "@/components/widgets/ErrorWidget";
import RestaurantsWidget from "@/components/widgets/RestaurantsWidget";
import { restaurantsFilters } from "@/config/filtersConfig";
import { useAddress } from "@/contexts/AddressContext";
import { useRestaurantFilters } from "@/contexts/RestaurantFiltersContext";
import { useGetRestaurants } from "@/lib/react-query/queries/restaurantQueries";
import { getInvalidAddressProps, getNoRestaurantsProps } from "@/lib/utils";
import { RestaurantTypeFilter } from "@/types/restaurantTypes";
import { useEffect } from "react";

const Restaurants = () => {
  const { selectedAddress, removeSelectedAddress } = useAddress();

  const { filters, removeFilters, setRestaurantTypeFilter } =
    useRestaurantFilters();

  const { data, error, isError, isFetching, fetchNextPage } = useGetRestaurants(
    selectedAddress,
    filters
  );

  const handleSetFilters = (currentValue?: RestaurantTypeFilter) => {
    let restaurantType: [] | [RestaurantTypeFilter] = [];

    if (currentValue) restaurantType = [currentValue];

    setRestaurantTypeFilter(restaurantType);
  };

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

  const noRestaurantsFound = !restaurants.length && !isFetching && !isError;
  const canShowRestaurants = !isError && (isFetching || !!restaurants.length);

  return (
    <div className="hero">
      <Navbar pageNum={3} />
      <main className="restaurants pt-0">
        <img
          src="/imgs/restaurants-bg.png"
          alt="restaurants-bg-img"
          className="bg-img"
        />
        <div className="">
          <div className="flex flex-col items-center gap-3">
            <RestaurantsWidget isError={isError} />
            {noRestaurantsFound && <ErrorWidget {...noRestaurantsErrProps} />}
            {isError && <ErrorWidget {...invalidAddressErrProps} />}
            {canShowRestaurants && (
              <>
                <FiltersPopover
                  filters={restaurantsFilters}
                  setFilters={handleSetFilters}
                />
                <div
                  className="primary-widget-bg border border-primary-20
                  w-full max-w-[900px] rounded-[30px] overflow-hidden"
                >
                  <ul className="restaurants__list">
                    {isFetching && !!!restaurants.length ? (
                      Array.from({ length: 5 }, (_, i) => (
                        <RestaurantSkeleton key={i} />
                      ))
                    ) : (
                      <RestaurantsList
                        restaurants={restaurants}
                        fetchNextPage={fetchNextPage}
                      />
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Restaurants;
