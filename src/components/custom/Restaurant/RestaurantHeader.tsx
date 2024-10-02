import { Button } from "@/components/ui/button";
import { getCityFromAddress } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface RestaurantHeaderProps {
  restaurantName: string;
  restaurantAddress: string;
  restaurantImg: string;
}

const RestaurantHeader = ({
  restaurantImg,
  restaurantName,
  restaurantAddress,
}: RestaurantHeaderProps) => {
  const navigate = useNavigate();

  const restautantCity = (
    getCityFromAddress(restaurantAddress) + ", italia"
  ).replace("a", "");

  const img = "/imgs/default-restaurant.png";

  return (
    <div className="restaurant__header">
      <div className="flex gap-5">
        <figure className="shrink-0">
          <img
            src={img}
            alt={`${restaurantName}-img`}
            className="w-[150px] h-[150px] object-cover rounded-[20px]"
          />
        </figure>
        <div className="w-full flex flex-col justify-between">
          <div className="">
            <h1 className="text-[30px]">{restaurantName}</h1>
            <p className="font-normal text-white/70">{restautantCity}</p>
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
      </div>
    </div>
  );
};
export default RestaurantHeader;
