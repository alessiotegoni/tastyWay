import {
  FoodType,
  RestaurantType,
  type RestaurantFilters,
} from "@/types/restaurantTypes";
import { createContext, ReactNode, useContext, useState } from "react";

interface RestaurantFiltersContext {
  filters: RestaurantFilters;
  setNameFilter: (name: string | null) => void;
  setFoodTypeFilter: (foodType: FoodType[] | null) => void;
  setRestaurantTypeFilter: (restaurantType: RestaurantType[] | null) => void;
  removeFilters: () => void;
}

const restaurantFilters: RestaurantFilters = {
  name: null,
  foodType: null,
  restaurantType: null,
};

const RestaurantFilters = createContext<RestaurantFiltersContext | null>(null);

const RestaurantFiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState(restaurantFilters);

  const setNameFilter = (name: string | null) =>
    setFilters({ ...filters, name });

  const setFoodTypeFilter = (foodType: FoodType[] | null) =>
    setFilters({ ...filters, foodType });

  const setRestaurantTypeFilter = (restaurantType: RestaurantType[] | null) =>
    setFilters({ ...filters, restaurantType });

  const removeFilters = () => setFilters(restaurantFilters);

  return (
    <RestaurantFilters.Provider
      value={{
        filters,
        setNameFilter,
        setFoodTypeFilter,
        setRestaurantTypeFilter,
        removeFilters,
      }}
    >
      {children}
    </RestaurantFilters.Provider>
  );
};
export default RestaurantFiltersProvider;

export const useRestaurantFilters = () => {
  const context = useContext(RestaurantFilters);
  if (!context)
    throw new Error(
      "useRestaurantFilters deve essere usato all'interto del suo provider"
    );

  return context;
};
