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
  const restaurantImg = "/imgs/default-restaurant.png";
  const restaurantCuisine = restaurant.cuisine.map((c, i) => (
    <li
      key={i}
      className="py-2 px-5 bg-home-widget-border-40
      rounded-[40px] font-medium text-[12px]"
    >
      {c}
    </li>
  ));

  const handleNavigate = () => navigate(`/restaurants/${restaurantName}`);

  // FIXME: switch heart icon with like thumb icon

  return (
    <li
      className="flex justify-between m-4 relative restaurant-separator"
      ref={observerRef}
    >
      <div className="col-left flex gap-4">
        <figure className="w-[260px] h-[140px]">
          <img
            src={restaurantImg}
            alt={`${restaurantName}-img`}
            className="w-full h-full object-cover rounded-[20px]"
          />
        </figure>
        <div className="">
          <figcaption className="text-[26px] font-semibold">
            {restaurant.name}
          </figcaption>
          <ul className="flex items-center gap-2 my-4">{restaurantCuisine}</ul>
        </div>
      </div>
      <div className="col-right flex flex-col justify-between">
        <div className="flex-center gap-2">
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
            <p>{restaurant.deliveryInfo.price}€</p>
          </div>
        </div>
        <div className="flex justify-end items-center gap-5">
          <p>❤️</p>
          <button
            onClick={handleNavigate}
            className="py-3 px-8 border border-[#FE0000] rounded-[40px]
            bg-[#EC0101] bg-opacity-60 hover:bg-opacity-90"
          >
            Ordina
          </button>
        </div>
      </div>
    </li>
  );
};
export default RestaurantItem;
