import { FormEvent, useState } from "react";
import { foodFilters } from "@/constants";
import { FoodType } from "@/types/restaurantTypes";
import { useNavigate } from "react-router-dom";
import LocationAutocomplete from "@/components/shared/autocomplete/LocationAutocomplete";
import { Button } from "@/components/ui/button";
import FoodTypeFilters from "@/components/shared/FoodTypeFilters";
import MyLocationBtn from "@/components/custom/MyLocationBtn";

const Home = () => {
  const [foodTypeFilters, setFoodTypeFilters] = useState<FoodType[]>([]);

  const navigate = useNavigate();

  const handleSearchRestaurant = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!localStorage.getItem("selectedAddress")) return;

    const filtersParams = new URLSearchParams();

    if (foodTypeFilters.length)
      foodTypeFilters.forEach((filter) =>
        filtersParams.append("filter", filter)
      );

    navigate(`/restaurants?${filtersParams.toString()}`);
  };

  return (
    <div className="home-widget sm:px-20">
      <h1 className="mb-[15px] xs:text-[18px] sm:text-[22px] font-semibold">
        Trova i ristoranti vicini a te!
      </h1>
      <form onSubmit={handleSearchRestaurant} className="search-box">
        <div className="flex items-center gap-2 w-full p-1 xs:p-0">
          <img
            src="icons/location-icon.png"
            alt="location-icon"
            className="w-6 h-6 xs:ml-[10px]"
          />
          <LocationAutocomplete
            shouldShowLatestResearch={true}
            placeholder="Inserisci il tuo indirizzo"
            className="grow"
          />
        </div>
        <div className="flex gap-2 mt-2 xs:mt-0">
          <MyLocationBtn className="justify-center xs:hidden basis-1/2" />
          <Button type="submit" className="search-btn basis-1/2 xs:basis-full">
            Cerca
          </Button>
        </div>
      </form>
      <MyLocationBtn className="hidden xs:flex mt-[15px]" />
      <div className="mt-2 xs:mt-5">
        <FoodTypeFilters
          filters={foodFilters.slice(0, 5)}
          foodTypes={foodTypeFilters}
          setFoodTypes={setFoodTypeFilters}
          carouselContentClasses="justify-between"
        />
      </div>
    </div>
  );
};
export default Home;
