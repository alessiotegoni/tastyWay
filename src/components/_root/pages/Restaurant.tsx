import RestaurantCart from "@/components/custom/restaurant/RestaurantCart";
import RestaurantCartMobileDialog from "@/components/custom/restaurant/RestaurantCartMobileDialog";
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
  itemsTypes: [],
};

const Restaurant = () => {
  const { restaurantName } = useParams();

  const [itemsFilters, setItemsFilters] = useState(defaultItemsFilters);

  const handleSetFilters = (currentValue?: RestaurantItemsTypes) =>
    setItemsFilters({
      ...itemsFilters,
      itemsTypes: currentValue ? [currentValue] : [],
    });

  const {
    data: restaurant,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRestaurantInfo(restaurantName);

  return (
    <div className="hero">
      <Navbar pageNum={4} />
      <main className="restaurant pt-0">
        <img
          src="/imgs/restaurants-bg.png"
          alt="restaurants-bg-img"
          className="bg-img"
        />
        <div className="mx-auto md:max-w-[1000px]">
          <div className="row flex gap-3">
            <div className="col grow md:basis-[640px]">
              {!isLoading && restaurant ? (
                <RestaurantHeader
                  restaurantName={restaurant.name}
                  restaurantImg={restaurant.imageUrl}
                  restaurantAddress={restaurant.address}
                />
              ) : (
                <RestaurantHeaderSkeleton />
              )}
              <div className="sm:flex-between mb-3 sm:mb-0 max-w-[638.66px]">
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
                {isSuccess && !!restaurant.itemsTypes.length && (
                  <div className="flex-between">
                    <FiltersPopover
                      filters={restaurantItemFilters.filter((itemFilter) =>
                        restaurant.itemsTypes.includes(itemFilter.value)
                      )}
                      setFilters={handleSetFilters}
                    />
                    {isSuccess && (
                      <RestaurantCartMobileDialog
                        restaurantId={restaurant._id}
                        restaurantName={restaurant.name}
                        restaurantPrice={restaurant.deliveryInfo.price}
                      />
                    )}
                  </div>
                )}
              </div>
              <RestauranItemsList
                restaurantId={restaurant?._id}
                itemsFilters={itemsFilters}
              />
            </div>
            {isSuccess && !!restaurant && (
              <div
                className="hidden md:block col sticky top-7 bg-home-widget
                  border border-primary-20 backdrop-blur-[123px] rounded-[30px]
                  p-5 h-fit basis-[350px]"
              >
                <RestaurantCart
                  restaurantId={restaurant._id}
                  restaurantName={restaurant.name}
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
