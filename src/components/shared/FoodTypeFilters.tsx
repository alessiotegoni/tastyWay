import { FoodFilters, FoodType } from "@/types/restaurantTypes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import useAddress from "@/hooks/useAddress";
import { toast } from "@/hooks/use-toast";
import { useMatch, useSearchParams } from "react-router-dom";

interface FoodTypeFiltersProps {
  filters: FoodFilters[];
  foodTypes: FoodType[];
  setFoodTypes: (foodTypes: FoodType[]) => void;
  carouselContentClasses?: string;
  isError?: boolean;
}

const FoodTypeFilters = ({
  filters,
  foodTypes,
  setFoodTypes,
  carouselContentClasses,
  isError,
}: FoodTypeFiltersProps) => {
  const { selectedAddress } = useAddress();

  const [_, setSearchParams] = useSearchParams();
  const isInRestaurants = useMatch("/restaurants");

  const handleSetFilters = (foodType: FoodType, hasFilter: boolean) => {
    if (isError) return;

    if (!selectedAddress)
      return toast({
        description: "Prima di selezionare il cibo inserisci il tuo indirizzo",
      });

    const newFoodType = hasFilter
      ? foodTypes.filter((ft) => ft !== foodType)
      : [...foodTypes, foodType];

    setFoodTypes(newFoodType);

    if (isInRestaurants) setSearchParams({ filter: newFoodType });
  };

  const carouseItems = filters.map((filter, i) => {
    const hasFilter = foodTypes.includes(filter.value);

    return (
      <CarouselItem
        key={i}
        className="basis-1/3 sm:basis-1/5 select-none mt-4 pl-0"
      >
        <figure
          className={`flex flex-col items-center justify-center group/food-filter-item ${
            isError ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => handleSetFilters(filter.value, hasFilter)}
        >
          <div
            className={`food-filter ${
              hasFilter
                ? "bg-home-widget-border-80"
                : "bg-home-widget-border-30"
            }`}
            aria-disabled={isError}
          >
            <img
              src={filter.img}
              alt={filter.name}
              className={`${
                filter.name === "Fast food"
                  ? "w-[40px] md:w-[60px]"
                  : "w-[35px] sm:w-auto"
              }`}
            />
          </div>
          <figcaption className="text-[13px] font-semibold mt-2">
            {filter.name}
          </figcaption>
        </figure>
      </CarouselItem>
    );
  });

  return (
    <Carousel>
      <CarouselPrevious className="carousel-btn -left-8 sm:-left-12" />
      <CarouselContent className={carouselContentClasses}>
        {carouseItems}
      </CarouselContent>
      <CarouselNext className="carousel-btn -right-8 sm:-right-12" />
    </Carousel>
  );
};

export default FoodTypeFilters;
