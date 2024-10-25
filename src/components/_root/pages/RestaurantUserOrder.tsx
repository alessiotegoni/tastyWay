import { useGetRestaurantOrder } from "@/lib/react-query/queries/restaurantQueries";
import { useParams } from "react-router-dom";

const RestaurantUserOrder = () => {
  const { orderId } = useParams();

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useGetRestaurantOrder(orderId);

  console.log(order);

  return <main className="restaurant-user-order">RestaurantUserOrder</main>;
};
export default RestaurantUserOrder;
