import RestaurantCart from "@/components/custom/restaurant/RestaurantCart";
import RestaurantHeader from "@/components/custom/restaurant/RestaurantHeader";
import RestauranItemsList from "@/components/custom/restaurant/RestaurantItemsList";
import FiltersPopover from "@/components/shared/FiltersPopover";
import Navbar from "@/components/shared/Navbar/Navbar";
import RestaurantHeaderSkeleton from "@/components/skeletons/RestaurantHeaderSkeleton";
import { Input } from "@/components/ui/input";
import { restaurantItemFilters } from "@/config/filtersConfig";
import { useGetRestaurantInfo } from "@/lib/react-query/queries/restaurantQueries";
import {
  RestaurantItemsFilters,
  RestaurantItemsTypes,
} from "@/types/restaurantTypes";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const defaultItemsFilters: RestaurantItemsFilters = {
  name: null,
  itemsType: null,
};

const Restaurant = () => {
  const { restaurantName } = useParams();

  const [itemsFilters, setItemsFilters] = useState(defaultItemsFilters);

  const handleSetFilters = (currentValue?: RestaurantItemsTypes) => {
    let itemsType = null;

    if (currentValue) itemsType = [currentValue];

    setItemsFilters({ ...itemsFilters, itemsType });
  };

  const {
    data: restaurant,
    isLoading,
    isError,
    error,
  } = useGetRestaurantInfo(restaurantName);

  // FIXME: mettere filtri ritornati dall'api
  // tramite un map del tipo di ogni item
  // quindi i filtri saranno tutti i tipi di
  // ogni item di quel ristorante

  return (
    <div className="hero">
      <Navbar pageNum={4} />
      <main className="restaurant pt-0">
        <img
          src="/imgs/restaurants-bg.png"
          alt="restaurants-bg-img"
          className="bg-img"
        />
        <div className="container max-w-[1000px]">
          <div className="row flex gap-3">
            <div className="col basis-[640px]">
              {!isLoading && !!restaurant ? (
                <RestaurantHeader
                  restaurantName={restaurant.name}
                  restaurantImg={restaurant.imageUrl}
                  restaurantAddress={restaurant.address}
                />
              ) : (
                <RestaurantHeaderSkeleton />
              )}
              <div className="flex-between">
                <div
                  className="bg-home-widget border border-home-widget-border-30
                rounded-[50px] p-2 px-5 flex-center gap-3 my-3 backdrop-blur-[123px]
                font-medium"
                >
                  <SearchIcon />
                  <Input
                    onChange={(e) =>
                      setItemsFilters({ ...itemsFilters, name: e.target.value })
                    }
                    placeholder="Cerca"
                    className="bg-transparent"
                  />
                </div>
                <FiltersPopover
                  filters={restaurantItemFilters}
                  setFilters={handleSetFilters}
                />
              </div>
              <RestauranItemsList
                restaurantId={restaurant?._id}
                itemsFilters={itemsFilters}
              />
            </div>
            {!isLoading && !!restaurant && (
              <div
                className="col sticky top-7 bg-home-widget border border-primary-20
            backdrop-blur-[123px] rounded-[30px] p-5 h-fit basis-[350px]"
              >
                <RestaurantCart
                  restaurantId={restaurant._id}
                  restaurantName={restaurantName!}
                  deliveryPrice={restaurant.deliveryInfo.price}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Restaurant;
