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

  return (
    <div className="restaurant__header">
      <div className="md:flex gap-5 md:gap-3 lg:gap-5">
        <figure className="shrink-0">
          <img
            src={restaurantImg ?? "/imgs/default-restaurant.png"}
            alt={`${restaurantName}-img`}
            className="md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px]
            object-cover rounded-[20px]"
          />
        </figure>
        <div className="w-full flex flex-col justify-between">
          <div className="">
            <h1 className="text-xl sm:text-3xl md:text-xl lg:text-[30px] mt-3 md:mt-0">
              {restaurantName}
            </h1>
            <p className="font-normal text-white/70">{restautantCity}</p>
          </div>
          <div
            className="flex
          md:justify-end md:items-end gap-3 mt-4 md:mt-0"
          >
            <Button
              onClick={() => navigate("/restaurants")}
              className="btn grow md:grow-0
          bg-home-widget-border-30 border border-primary-80 hover:bg-home-widget-border-80
          p-3 px-6 md:p-3 md:px-5 lg:p-3 lg:px-6 md:text-sm lg:text-base md:font-medium
          lg:font-semibold rounded-[15px]"
            >
              Vedi altri ristoranti
            </Button>
            <Button
              className="btn grow md:grow-0 bg-[#00d0925d] border border-[#00D394]
            hover:bg-[#00d092ad] min-w-[51.5px] min-h-[51.5px]
            md:min-h-[46px] lg:min-h-[51.5px] rounded-[15px]"
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
