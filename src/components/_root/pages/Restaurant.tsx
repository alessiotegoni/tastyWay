import RestauranItemsList from "@/components/custom/RestaurantItems/RestaurantItemsList";
import FiltersPopover from "@/components/shared/FiltersPopover";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetRestaurant } from "@/lib/react-query/queries";
import { getCityFromAddress } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Restaurant = () => {
  const { restaurantName } = useParams();

  const navigate = useNavigate();

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

  const restaurantImg = "/imgs/default-restaurant.png";
  const restautantCity = (
    getCityFromAddress(restaurant?.address ?? "") + ", italia"
  ).replace("a", "");

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
              <div className="restaurant__header">
                <div className="flex gap-3">
                  <figure className="">
                    <img
                      src={restaurantImg}
                      alt={`${restaurant?.name}-img`}
                      className="w-[150px] h-[150px] object-cover rounded-[20px]"
                    />
                  </figure>
                  <div className="">
                    <h1 className="text-[30px]">{restaurant?.name}</h1>
                    <p className="font-normal text-white/70">
                      {restautantCity}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end items-end gap-3">
                  <Button
                    onClick={() => navigate(-1)}
                    className="btn
                    bg-home-widget-border-30 border border-primary-80
                    p-3 px-6 rounded-[15px] hover:bg-home-widget-border-80"
                  >
                    Vedi altri ristoranti
                  </Button>
                  <Button
                    className="btn bg-[#00d0925d] border border-[#00D394]
                    h-[51.5px] w-[51.5px] rounded-[15px] hover:bg-[#00d092ad]"
                  >
                    <img
                      src="/icons/thumb-icon.png"
                      alt="thumb-img"
                      width={24}
                      height={24}
                    />
                  </Button>
                </div>
              </div>
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
