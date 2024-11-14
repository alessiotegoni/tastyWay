import { Button } from "@/components/ui/button";
import { formatRestaurantName } from "@/lib/utils";
import { RestaurantsType } from "@/types/restaurantTypes";
import { useNavigate } from "react-router-dom";

interface RestaurantItemProps {
  restaurant: RestaurantsType;
  observerRef?: (node?: Element | null) => void | undefined;
}

const RestaurantItem = ({ restaurant, observerRef }: RestaurantItemProps) => {
  const navigate = useNavigate();

  const restaurantName = formatRestaurantName(restaurant.name);
  const restaurantImg = restaurant.imageUrl ?? "/imgs/default-restaurant.png";
  const restaurantCuisine = restaurant.cuisine.map((c, i) => (
    <li
      key={i}
      className="py-2 px-5 bg-home-widget-border-40
      rounded-[40px] font-medium text-[12px]"
    >
      {c.replace("_", " ")}
    </li>
  ));

  const handleNavigate = () => navigate(`/restaurants/${restaurantName}`);

  return (
    <li
      className="lg:flex justify-between m-4 relative restaurant-separator"
      ref={observerRef}
    >
      <div className="col-left sm:flex grow gap-4">
        <figure className="sm:w-[260px] sm:h-[160px]">
          <img
            src={restaurantImg}
            alt={`${restaurantName}-img`}
            className="w-full h-full object-cover rounded-[20px]"
          />
        </figure>
        <div className="mt-3 mb-4 sm:mt-0">
          <figcaption className="text-2xl sm:text-[26px] font-semibold">
            {restaurant.name}
          </figcaption>
          <ul className="flex items-center gap-2 mt-2 sm:mt-4">
            {restaurantCuisine}
          </ul>
        </div>
      </div>
      <div className="col-right flex flex-col sm:flex-row lg:flex-col justify-between gap-3 sm:gap-0 mt-3 lg:mt-0">
        <div className="lg:flex-center flex gap-2">
          <div
            className="restaurant-deliveryinfo bg-[#004D85]
           border-[#0088EB] text-[#C8DEFF]"
          >
            <img
              src="/icons/delivery-time-icon.png"
              alt="delivery-time-icon"
              width={30}
            />
            <p>{restaurant.deliveryInfo.time}</p>
            <p>min</p>
          </div>
          <div
            className="bg-[#FCAE08] restaurant-deliveryinfo
           border-[#825800] text-[#171001]"
          >
            <img
              src="/icons/delivery-price-icon.png"
              alt="delivery-price-icon"
              width={30}
            />
            <p>{restaurant.deliveryInfo.price.toFixed(2)}€</p>
          </div>
        </div>
        <div className="flex xs:justify-end sm:items-center gap-2">
          <Button
            className="btn bg-[#00d0925d] border border-[#00D394]
            hover:bg-[#00d092ad] h-full py-3 rounded-2xl sm:rounded-[40px]
            basis-20 min-w-[60px] max-w-[70px]"
          >
            <img
              src="/icons/thumb-icon.png"
              alt="thumb-img"
              width={24}
              height={24}
            />
          </Button>
          <Button
            onClick={handleNavigate}
            className="basis-80 py-3 px-8 border border-[#FE0000]
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
