import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { formatRestaurantName } from "@/lib/utils";
import { RestaurantsType } from "@/types/restaurantTypes";
import { useNavigate } from "react-router-dom";

interface RestaurantItemProps {
  restaurant: RestaurantsType;
  observerRef?: (node?: Element | null) => void | undefined;
}

const RestaurantItem = ({ restaurant, observerRef }: RestaurantItemProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const restaurantName = formatRestaurantName(restaurant.name);
  const restaurantImg = restaurant.imageUrl ?? "/imgs/default-restaurant.png";
  const restaurantCuisine = restaurant.cuisine.map((c, i) => (
    <li
      key={i}
      className="py-2 px-4 text-xs bg-home-widget-border-40
      rounded-[40px] font-medium text-[12px]"
    >
      {c.replaceAll("_", " ").toLowerCase()}
    </li>
  ));

  const handleNavigate = () => navigate(`/restaurants/${restaurantName}`);

  return (
    <li
      className="lg:flex justify-between m-4 relative restaurant-separator"
      ref={observerRef}
    >
      <div className="col-left sm:flex grow gap-4">
        <figure className="sm:w-[260px] sm:h-[160px] aspect-square shrink-0">
          <img
            src={restaurantImg}
            alt={restaurantName}
            className="w-full h-full object-cover rounded-[20px]"
          />
        </figure>
        <div className="mt-3 mb-4 sm:mt-0">
          <figcaption className="text-2xl sm:text-[26px] font-semibold">
            {restaurant.name}
          </figcaption>
          <ul className="flex items-center flex-wrap gap-2 mt-2 sm:mt-4">
            {restaurantCuisine}
          </ul>
        </div>
      </div>
      <div className="col-right flex flex-col sm:flex-row lg:flex-col justify-between gap-3 sm:gap-0 mt-3 lg:mt-0">
        <div className="flex items-center flex-wrap md:flex-nowrap lg:flex-center gap-2">
          {user?.restaurantName === restaurant.name && (
            <div
              className="bg-restaurant-primary
              border-restaurant-border restaurant-info"
            >
              <p className="whitespace-nowrap">Tuo ristorante</p>
            </div>
          )}
          <div
            className="restaurant-info bg-[#004D85]
           border-[#0088EB] text-[#C8DEFF]"
          >
            <img
              src="/icons/delivery-time-icon.png"
              alt="delivery-time-icon"
              width={20}
            />
            <p className="whitespace-nowrap">
              {restaurant.deliveryInfo.time} min
            </p>
          </div>
          <div
            className="bg-[#FCAE08] restaurant-info
           border-[#ffd374] text-[#171001]"
          >
            <img
              src="/icons/delivery-price-icon.png"
              alt="delivery-price-icon"
              width={20}
            />
            <p>{restaurant.deliveryInfo.price.toFixed(2)}€</p>
          </div>
        </div>
        <div className="flex xs:justify-end sm:items-center gap-2">
          <Button
            onClick={handleNavigate}
            className="grow basis-80 py-3 px-8 border border-[#FE0000]
            rounded-2xl sm:rounded-[40px] xs:max-w-[140px] md:max-w-[120px]
            bg-[#EC0101] bg-opacity-60 hover:bg-opacity-90"
          >
            Ordina
          </Button>
        </div>
      </div>
    </li>
  );
};
export default RestaurantItem;
