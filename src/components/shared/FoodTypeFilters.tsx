import { FoodFilters, FoodType } from "@/types/restaurantTypes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useRestaurantFilters } from "@/contexts/RestaurantFiltersContext";
import { useAddress } from "@/contexts/AddressContext";
import { toast } from "@/hooks/use-toast";

interface FoodTypeFiltersProps {
  filters: FoodFilters[];
  carouselContentClasses?: string;
  isError?: boolean;
}

const FoodTypeFilters = ({
  filters,
  carouselContentClasses,
  isError,
}: FoodTypeFiltersProps) => {
  const {
    filters: { foodType: foodTypeFilters },
    setFoodTypeFilter,
  } = useRestaurantFilters();

  const { selectedAddress } = useAddress();

  const handleSetFilters = (foodType: FoodType, hasFilter: boolean) => {
    if (isError) return;

    if (!selectedAddress)
      return toast({
        description: "Prima di selezionare il cibo inserisci il tuo indirizzo",
      });

    const removeFilter = () => foodTypeFilters!.filter((ft) => ft !== foodType);
    const addFilter = () =>
      foodTypeFilters ? [...foodTypeFilters, foodType] : [foodType];

    const newFoodType = hasFilter ? removeFilter() : addFilter();

    setFoodTypeFilter(newFoodType);
  };

  const carouseItems = filters.map((filter, i) => {
    const hasFilter =
      !!foodTypeFilters && foodTypeFilters.includes(filter.value);

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
