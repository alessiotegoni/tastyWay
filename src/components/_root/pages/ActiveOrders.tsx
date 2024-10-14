import UserActiveOrders from "@/components/custom/activeOrders/UserActiveOrders";
import UserActiveOrderSkeleton from "@/components/skeletons/UserActiveOrderSkeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useGetActiveOrders } from "@/lib/react-query/queries";

interface ActiveOrdersProps {
  setHasActiveOrders?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActiveOrders = ({ setHasActiveOrders }: ActiveOrdersProps) => {
  const { user, isAuthenticated } = useAuth();

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetActiveOrders(user!.isCmpAccount, isAuthenticated);

  if (orders?.length && !isLoading && setHasActiveOrders)
    setHasActiveOrders(true);

  console.log(orders);

  // TODO: aggiungere un componente per la lista degli item,
  // shared tra gli item del carrello e gli item dell'ordine dell'utente

  // TODO: quando finisco la sezione degli utente e inizio con quella
  // dei ristoranti, aggiungere che se orders.type === "USERS__ORDERS"
  // dare il componente <UserActiveOrders /> senno dare componente
  // <RestaurantActiveOrders /> che ovviamente avra la sua chiamata
  // api al suo interno

  return isLoading ? (
    <UserActiveOrderSkeleton />
  ) : (
    <UserActiveOrders orders={orders} />
  );
};

export default ActiveOrders;
