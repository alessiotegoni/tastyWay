import RestaurantHeader from "@/components/custom/Restaurant/RestaurantHeader";
import RestauranItemsList from "@/components/custom/Restaurant/RestaurantItemsList";
import FiltersPopover from "@/components/shared/FiltersPopover";
import Navbar from "@/components/shared/Navbar/Navbar";
import RestaurantHeaderSkeleton from "@/components/skeletons/RestaurantHeaderSkeleton";
import { Input } from "@/components/ui/input";
import { useGetRestaurant } from "@/lib/react-query/queries";
import { SearchIcon } from "lucide-react";
import { useParams } from "react-router-dom";

const Restaurant = () => {
  const { restaurantName } = useParams();

  const {
    data: restaurant,
    isLoading,
    isError,
    error,
  } = useGetRestaurant(restaurantName);

  console.log(restaurant);

  // TODO: restaurant ui
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
        <div className="container max-w-[1200px]">
          <div className="row flex">
            <div className="col min-w-[800px]">
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
              {restaurant?.items.length && (
                <RestauranItemsList restaurant={restaurant} />
              )}
            </div>
            <div className="col"></div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Restaurant;
