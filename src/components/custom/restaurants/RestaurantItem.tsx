import { formatRestaurantName } from "@/lib/utils";
import { RestaurantsType } from "@/types/restaurantTypes";
import { useNavigate } from "react-router-dom";

interface RestaurantItemProps {
  restaurant: RestaurantsType;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  console.log(restaurant);

  const navigate = useNavigate();

  const restaurantName = formatRestaurantName(restaurant.name);
  const restaurantImg = "/imgs/default-restaurant.png";
  const restaurantCuisine = restaurant.cuisine.map((c, i) => (
    <li
      key={i}
      className="py-2 px-6 bg-home-widget-border-40
      rounded-[40px] font-medium text-[13px]"
    >
      {c}
    </li>
  ));

  const handleNavigate = () => navigate(`/restaurants/${restaurantName}`);

  return (
    <li className="flex justify-between">
      <div className="col-left flex gap-2">
        <figure className="w-[260px] h-[140px]">
          <img
            src={restaurantImg}
            alt={`${restaurantName}-img`}
            className="w-full h-full object-contain rounded-[20px]"
          />
        </figure>
        <div className="">
          <figcaption className="text-[26px]">{restaurant.name}</figcaption>
          <ul className="flex items-center gap-2 my-4">{restaurantCuisine}</ul>
        </div>
      </div>
      <div className="col-right flex flex-col justify-between">
        <div className="delivery-time flex-center">
          <p>{restaurant.deliveryInfo.time}</p>
        </div>
        <div className="flex-center gap-5">
          <p>❤️</p>
          <button
            onClick={handleNavigate}
            className="py-3 px-8 border border-[#FE0000] rounded-[40px]
            bg-[#EC0101] bg-opacity-60 hover:bg-opacity-90"
            >Ordina</button>
        </div>
      </div>
    </li>
  );
};
export default RestaurantItem;
