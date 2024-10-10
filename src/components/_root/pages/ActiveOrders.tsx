import { useAuth } from "@/contexts/AuthContext";
import { useGetActiveOrders } from "@/lib/react-query/queries";

const ActiveOrders = () => {
  const { user, isAuthenticated } = useAuth();

  const { data, isLoading, isError, error } = useGetActiveOrders(
    user!.isCmpAccount,
    isAuthenticated
  );

  console.log(data);

  return <div>ActiveOrders</div>;
};
export default ActiveOrders;
