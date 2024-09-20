import { useAddress } from "@/contexts/AddressContext";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getCityFromAddress } from "@/lib/utils";
import FoodTypeFilters from "../shared/FoodTypeFilters";
import XIconBtn from "../shared/XIconBtn";
import { useRestaurantFilters } from "@/contexts/RestaurantFiltersContext";
import { foodFilters } from "@/constants";

const RestaurantsWidget = () => {
  const { selectedAddress } = useAddress();

  const { setNameFilter } = useRestaurantFilters()

  const [input, setInput] = useState("");

  useEffect(() => {
    if (!input) setNameFilter(null);
  }, [input]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input) setNameFilter(input)
  };

  const handleRemoveInput = () => setInput("");

  const restaurantCity = getCityFromAddress(selectedAddress!);

  return (
    <div className="mt-5 px-16 home-widget">
      <h1 className="font-medium text-[30px]">Ristoranti {restaurantCity}</h1>
      <form className="my-5 search-restaurant-box" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 pl-2 w-full max-w-[380px] relative">
          <img
            src="/icons/search-restaurant-icon.png"
            alt="search-restaurant-icon"
          />
          <Input
            className="widget-input max-w-[290px]"
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
      <FoodTypeFilters filters={foodFilters} />
    </div>
  );
};
export default RestaurantsWidget;
