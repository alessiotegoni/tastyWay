import RestaurantActiveOrders from "@/components/custom/activeOrders/RestaurantActiveOrders";
import UserActiveOrders from "@/components/custom/activeOrders/UserActiveOrders";
import RestaurantActiveOrderSkeleton from "@/components/skeletons/RestaurantActiveOrderSkeleton";
import UserActiveOrderSkeleton from "@/components/skeletons/UserActiveOrderSkeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useGetActiveOrders } from "@/lib/react-query/queries/userQueries";
import { Navigate } from "react-router-dom";

const ActiveOrders = () => {
  const { user, isAuthenticated } = useAuth();

  const { isCmpAccount, restaurantName } = user!;

  if (isCmpAccount && !restaurantName) return <Navigate to="/" />;

  const { data, isLoading, isError, error } = useGetActiveOrders(
    isCmpAccount,
    isAuthenticated
  );

  return (
    <>
      {isCmpAccount && isLoading && <RestaurantActiveOrderSkeleton />}
      {!isCmpAccount && isLoading && <UserActiveOrderSkeleton />}

      {!isLoading && data.type === "USER_ORDERS" && (
        <UserActiveOrders orders={data.orders} />
      )}
      {!isLoading && data.type === "RESTAURANT_ORDERS" && (
        <RestaurantActiveOrders orders={data.orders} />
      )}
    </>
  );
};

export default ActiveOrders;
