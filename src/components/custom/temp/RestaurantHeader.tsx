import { Button } from "@/components/ui/button";
import { getCityFromAddress } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import MapsModal from "../MapsModal";
import { RestaurantRes } from "@/types/restaurantTypes";

const RestaurantHeader = ({
  imageUrl,
  name,
  address,
  coordinates,
}: RestaurantRes) => {
  const navigate = useNavigate();

  return (
    <div className="restaurant__header">
      <div className="md:flex gap-5 md:gap-3 lg:gap-5">
        <figure className="shrink-0">
          <img
            src={imageUrl ?? "/imgs/default-restaurant.png"}
            alt={`${name}-img`}
            className="md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px]
            object-cover rounded-[20px]"
          />
        </figure>
        <div className="w-full flex flex-col justify-between">
          <div className="flex justify-between mt-3 md:mt-0">
            <div>
              <h1 className="text-xl md:text-lg font-semibold lg:text-[30px]">
                {name}
              </h1>
              <p className="font-normal text-white/70">
                {(getCityFromAddress(address) + ", italia").replace("a", "")}
              </p>
            </div>
            <MapsModal name={name} coordinates={coordinates} />
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestaurantHeader;
