import RestaurantsList from "@/components/custom/restaurants/RestaurantsList";
import FiltersPopover from "@/components/shared/FiltersPopover";
import Navbar from "@/components/shared/Navbar/Navbar";
import RestaurantSkeleton from "@/components/skeletons/RestaurantSkeleton";
import ErrorWidget from "@/components/widgets/ErrorWidget";
import RestaurantsWidget from "@/components/widgets/RestaurantsWidget";
import { restaurantsFilters } from "@/config/filtersConfig";
import { cuisineTypes } from "@/constants";
import useAddress from "@/hooks/useAddress";
import { useGetRestaurants } from "@/lib/react-query/queries/restaurantQueries";
import { getInvalidAddressProps, getNoRestaurantsProps } from "@/lib/utils";
import {
  FoodType,
  RestaurantFilters,
  RestaurantTypeFilter,
} from "@/types/restaurantTypes";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const defaultRestaurantFilters: RestaurantFilters = {
  name: null,
  foodType: [],
  restaurantType: [],
};

const Restaurants = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const restaurantFilters = { ...defaultRestaurantFilters };

  const foodTypeParams = (searchParams.getAll("filter") as FoodType[]).filter(
    (ft) => cuisineTypes.includes(ft)
  );
  if (foodTypeParams.length) restaurantFilters.foodType = foodTypeParams;

  const { selectedAddress, removeSelectedAddress } = useAddress();

  const [filters, setFilters] = useState(restaurantFilters);

  const { data, error, isError, isLoading, hasNextPage, fetchNextPage } =
    useGetRestaurants(selectedAddress, filters);

  const handleSetRTFilters = (currentValue?: RestaurantTypeFilter) => {
    const restaurantType = currentValue ? [currentValue] : [];

    setFilters({ ...filters, restaurantType });
  };

  const handleResetFilters = () => {
    setFilters(defaultRestaurantFilters);
    setSearchParams({});
  };

  const invalidAddressErrProps = getInvalidAddressProps(
    removeSelectedAddress,
    error
  );

  const noRestaurantsErrProps = getNoRestaurantsProps(
    () => handleResetFilters(),
    removeSelectedAddress
  );

  const restaurants = data?.pages.flatMap((p) => p.restaurants) ?? [];

  const noRestaurantsFound = !restaurants.length && !isLoading && !isError;
  const canShowRestaurants = !isError && (isLoading || !!restaurants.length);

  return (
    <div className="hero">
      <Navbar pageNum={3} />
      <main className="restaurants pt-0 mt-4 sm:mt-0">
        <img
          src="/imgs/restaurants-bg.png"
          alt="restaurants-bg-img"
          className="bg-img"
        />
        <div>
          <div className="flex flex-col items-center gap-3">
            <RestaurantsWidget
              isError={isError}
              filters={filters}
              setFilters={setFilters}
            />
            {noRestaurantsFound && <ErrorWidget {...noRestaurantsErrProps} />}
            {isError && <ErrorWidget {...invalidAddressErrProps} />}
            {canShowRestaurants && (
              <>
                <FiltersPopover
                  filters={restaurantsFilters}
                  setFilters={handleSetRTFilters}
                />
                <div
                  className="primary-widget-bg border border-primary-20
                  w-full max-w-[900px] rounded-[30px] overflow-hidden"
                >
                  <ul className="restaurants__list">
                    {isLoading && !restaurants.length ? (
                      Array.from({ length: 2 }, (_, i) => (
                        <RestaurantSkeleton key={i} />
                      ))
                    ) : (
                      <RestaurantsList
                        restaurants={restaurants}
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
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
