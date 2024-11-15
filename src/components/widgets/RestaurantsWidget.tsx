import useAddress from "@/hooks/useAddress";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getCityFromAddress } from "@/lib/utils";
import FoodTypeFilters from "../shared/FoodTypeFilters";
import XIconBtn from "../shared/XIconBtn";
import { foodFilters } from "@/constants";
import { RestaurantFilters } from "@/types/restaurantTypes";

interface RestaurantsWidgetProps {
  isError?: boolean;
  filters: RestaurantFilters;
  setFilters: React.Dispatch<React.SetStateAction<RestaurantFilters>>;
}

const RestaurantsWidget = ({
  isError,
  filters,
  setFilters,
}: RestaurantsWidgetProps) => {
  const { selectedAddress } = useAddress();

  const [input, setInput] = useState("");

  const handleRemoveInput = () => setInput("");

  useEffect(() => {
    if (!input) setFilters({ ...filters, name: null });
  }, [input]);

  useEffect(() => {
    if (Object.values(filters).every((f) => !f)) handleRemoveInput();
  }, [filters]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input) setFilters({ ...filters, name: input });
  };

  const restaurantCity = getCityFromAddress(selectedAddress!);

  return (
    <div className="home-widget sm:px-16">
      <h1 className="font-medium text-xl xs:text-2xl sm:text-[30px]">
        Ristoranti {restaurantCity}
      </h1>
      <form className="my-5 search-box" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 w-full p-1 xs:p-0 relative">
          <img
            src="/icons/search-restaurant-icon.png"
            alt="search-restaurant-icon"
            className="xs:ml-2"
          />
          <Input
            className="widget-input max-w-[290px] text-sm sm:text-base"
            type="text"
            placeholder="Cerca ristorante"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <XIconBtn
            input={input}
            handleRemoveInput={handleRemoveInput}
            className="right-3"
          />
        </div>
        <Button type="submit" className="search-btn">
          Cerca
        </Button>
      </form>
      <FoodTypeFilters
        filters={foodFilters}
        foodTypes={filters.foodType}
        setFoodTypes={(foodType) => setFilters({ ...filters, foodType })}
        isError={isError}
      />
    </div>
  );
};
export default RestaurantsWidget;
