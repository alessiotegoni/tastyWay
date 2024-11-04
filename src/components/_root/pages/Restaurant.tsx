import RestaurantCart from "@/components/custom/restaurant/RestaurantCart";
import RestaurantHeader from "@/components/custom/restaurant/RestaurantHeader";
import RestauranItemsList from "@/components/custom/restaurant/RestaurantItemsList";
import FiltersPopover from "@/components/shared/FiltersPopover";
import Navbar from "@/components/shared/Navbar/Navbar";
import RestaurantHeaderSkeleton from "@/components/skeletons/RestaurantHeaderSkeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { restaurantItemFilters } from "@/config/filtersConfig";
import { useCart } from "@/hooks/useCart";
import { useGetRestaurantInfo } from "@/lib/react-query/queries/restaurantQueries";
import {
  RestaurantItemsFilters,
  RestaurantItemsTypes,
} from "@/types/restaurantTypes";
import { SearchIcon, ShoppingBasket, X } from "lucide-react";
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
    isSuccess,
    isError,
    error,
  } = useGetRestaurantInfo(restaurantName);

  const { restaurantCart } = useCart(restaurant?._id);

  const cartItemsLength = restaurantCart.reduce(
    (acc, item) => (acc += item.qnt),
    0
  );

  const restaurantCartEl = isSuccess && (
    <RestaurantCart
      restaurantId={restaurant._id}
      restaurantName={restaurant.name}
      deliveryPrice={restaurant.deliveryInfo.price}
    />
  );

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
              <div className="sm:flex-between mb-3 sm:mb-0">
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
                <div className="flex-between">
                  <FiltersPopover
                    filters={restaurantItemFilters}
                    setFilters={handleSetFilters}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="shrink-0 md:hidden btn block sticky top-0 w-[51px] h-[51px]
        backdrop-blur-3xl rounded-full bg-home-widget border border-primary-20"
                      >
                        <div className="relative h-full flex-center">
                          <ShoppingBasket className="w-5 sm:w-10" />
                          <p
                            className="absolute -top-[9px] -right-[9px] sm:-top-1 sm:-right-1
            text-xs w-6 h-6 flex-center bg-[#ed0000] rounded-full"
                          >
                            {cartItemsLength}
                          </p>
                        </div>
                      </Button>
                    </AlertDialogTrigger>
                    {isSuccess && (
                      <AlertDialogContent className="p-0 px-3 block border-none max-w-[400px]">
                        <div
                          className="bg-home-widget
                  border border-primary-20 backdrop-blur-[123px] rounded-[30px]
                  p-5"
                        >
                          {restaurantCartEl}
                        </div>
                        <AlertDialogFooter className="flex-row justify-end mt-5">
                          <AlertDialogCancel
                            className="btn w-10 h-10 rounded-full
                          backdrop-blur-3xl bg-[#ec01017e]
               border border-x-icon-bg-70 hover:bg-[#ec0101d9]"
                          >
                            <X size={20} />
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    )}
                  </AlertDialog>
                </div>
              </div>
              <RestauranItemsList
                restaurantId={restaurant?._id}
                itemsFilters={itemsFilters}
              />
            </div>
            {!isLoading && !!restaurant && (
              <div
                className="hidden md:block col sticky top-7 bg-home-widget
                  border border-primary-20 backdrop-blur-[123px] rounded-[30px]
                  p-5 h-fit basis-[350px]"
              >
                {restaurantCartEl}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Restaurant;
