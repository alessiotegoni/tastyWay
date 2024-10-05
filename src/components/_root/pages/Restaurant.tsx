import RestaurantCart from "@/components/custom/Restaurant/RestaurantCart";
import RestaurantHeader from "@/components/custom/Restaurant/RestaurantHeader";
import RestauranItemsList from "@/components/custom/Restaurant/RestaurantItemsList";
import FiltersPopover from "@/components/shared/FiltersPopover";
import Navbar from "@/components/shared/Navbar/Navbar";
import RestaurantHeaderSkeleton from "@/components/skeletons/RestaurantHeaderSkeleton";
import { Input } from "@/components/ui/input";
import { useGetRestaurantInfo } from "@/lib/react-query/queries";
import { RestaurantItemsFilters } from "@/types/restaurantTypes";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const defaultItemsFilters: RestaurantItemsFilters = {
  name: null,
  itemsType: null,
};

const Restaurant = () => {
  const [itemsFilters, setItemsFilters] = useState(defaultItemsFilters);

  const { restaurantName } = useParams();

  const {
    data: restaurant,
    isLoading,
    isError,
    error,
  } = useGetRestaurantInfo(restaurantName);

  // TODO: Filter item logic, aggiungere che ad ogni item corrisponde una categoria
  // che ovviamente il titolare immettera' nella creazione dell'item
  // quindi aggiungere anche un menu a sinstra che ti permette di scrollare
  // tramite un link  fino alla categoria desiderata
  // TODO: gli items del ristorante li fetcho a parte nel componente apposito
  // RestauranItemsList (creare route e controller cosi' da far funzionare anche i filtri)

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
                  <Input placeholder="Cerca" className="bg-transparent" />
                </div>
                <FiltersPopover />
              </div>
              {!!restaurant && (
                <RestauranItemsList
                  restaurantId={restaurant._id}
                  itemsFilters={itemsFilters}
                />
              )}
            </div>
            <div
              className="col sticky top-0 bg-home-widget border border-primary-20
            backdrop-blur-[123px] rounded-[30px] p-5 h-fit basis-[350px]"
            >
              <RestaurantCart
                restaurantId={restaurant?._id!}
                deliveryPrice={restaurant?.deliveryInfo.price!}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Restaurant;
