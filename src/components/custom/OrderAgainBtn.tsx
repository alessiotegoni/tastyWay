import { UserPrevOrder } from "@/types/userTypes";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { formatRestaurantName } from "@/lib/utils";

interface OrderAgainBtnProps {
  order: UserPrevOrder;
}

const OrderAgainBtn = ({
  order: { restaurant, items },
}: OrderAgainBtnProps) => {
  const { handleSetCart } = useCart();

  const navigate = useNavigate();

  const handleOrderAgain = () => {
    handleSetCart({
      restaurantId: restaurant.id,
      itemsIds: items.map((i) => i._id),
      type: "ADD",
    });

    navigate(`/restaurants/${formatRestaurantName(restaurant.name)}`);
  };

  return (
    <Button
      className="btn py-2 px-5 text-sm
                          bg-home-widget-border-50 hover:bg-home-widget-border-80
                          rounded-xl"
      onClick={handleOrderAgain}
    >
      Ordina ancora
    </Button>
  );
};
export default OrderAgainBtn;
