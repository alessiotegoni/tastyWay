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
              isError={isError || noRestaurantsFound}
              filters={filters}
              setFilters={setFilters}
            />
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
                  <ul
                    className={`flex flex-col ${
                      restaurants.length === 1 ? "min-h-[400px]" : "min-h-fit"
                    }`}
                  >
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
            {noRestaurantsFound && (
              <ErrorWidget
                title="Oops! Non abbiamo trovato il ristorante che stai cercando."
                className="primary-widget-bg border border-primary-20 rounded-[30px] max-w-[650px]"
                subtitle="Ma non preoccuparti! Prova a controllare la tua ricerca per eventuali errori di ortografia, oppure esplora ristoranti simili che potrebbero piacerti. Continuare la tua esplorazione?"
                btns={[
                  !!filters.foodType.length ||
                  !!filters.name ||
                  !!filters.restaurantType.length
                    ? {
                        id: "resetFilters",
                        value: "Resetta filtri",
                        icon: "reset-filters-icon",
                        className:
                          "bg-home-widget-border-30 border border-primary-80 my-0 hover:bg-home-widget-border-80",
                        handleClick: () => handleResetFilters(),
                      }
                    : {
                        id: "changePosition",
                        value: "Cambia posizione",
                        icon: "cursor-icon",
                        className:
                          "use-location-btn my-0 border-location-btn-border-70",
                        goto: "/",
                        handleClick: () => removeSelectedAddress(),
                      },
                ]}
              />
            )}
            {isError && (
              <ErrorWidget
                error={error}
                className="primary-widget-bg border border-primary-20 rounded-[30px]"
                subtitle="Non siamo riusciti a trovare ristoranti nella tua zona perché non è stato inserito un indirizzo valido. Per scoprire i migliori ristoranti vicini a te, inserisci un indirizzo corretto nel campo di ricerca. Questo ci aiuterà a mostrarti le opzioni più adatte e vicine."
                btns={[
                  {
                    id: "change_location",
                    value: "Cambia posizione",
                    icon: "cursor-icon",
                    className: "use-location-btn my-0",
                    goto: "/",
                    handleClick: () => removeSelectedAddress(),
                  },
                ]}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Restaurants;
