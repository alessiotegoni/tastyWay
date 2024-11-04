import { useAddress } from "@/contexts/AddressContext";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getCityFromAddress } from "@/lib/utils";
import FoodTypeFilters from "../shared/FoodTypeFilters";
import XIconBtn from "../shared/XIconBtn";
import { useRestaurantFilters } from "@/contexts/RestaurantFiltersContext";
import { foodFilters } from "@/constants";

interface RestaurantsWidgetProps {
  isError?: boolean;
}

const RestaurantsWidget = ({ isError }: RestaurantsWidgetProps) => {
  const { selectedAddress } = useAddress();

  const { filters, setNameFilter } = useRestaurantFilters();

  const [input, setInput] = useState("");

  useEffect(() => {
    if (!input) setNameFilter(null);
  }, [input]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input) setNameFilter(input);
  };

  const handleRemoveInput = () => setInput("");

  useEffect(() => {
    if (Object.values(filters).every((f) => !f)) handleRemoveInput();
  }, [filters]);

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
      <FoodTypeFilters filters={foodFilters} isError={isError} />
    </div>
  );
};
export default RestaurantsWidget;
