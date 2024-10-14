import RestaurantActiveOrders from "@/components/custom/activeOrders/RestaurantActiveOrders";
import UserActiveOrders from "@/components/custom/activeOrders/UserActiveOrders";
import RestaurantActiveOrderSkeleton from "@/components/skeletons/RestaurantActiveOrderSkeleton";
import UserActiveOrderSkeleton from "@/components/skeletons/UserActiveOrderSkeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useGetActiveOrders } from "@/lib/react-query/queries";

interface ActiveOrdersProps {
  setHasActiveOrders?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActiveOrders = ({ setHasActiveOrders }: ActiveOrdersProps) => {
  const { user, isAuthenticated } = useAuth();

  const isCmpAccount = user!.isCmpAccount;

  const { data, isLoading, isError, error } = useGetActiveOrders(
    isCmpAccount,
    isAuthenticated
  );

  if (data?.length && !isLoading && setHasActiveOrders)
    setHasActiveOrders(true);

  console.log(data, isLoading);

  // TODO: aggiungere un componente per la lista degli item,
  // shared tra gli item del carrello e gli item dell'ordine dell'utente

  // TODO: quando finisco la sezione degli utente e inizio con quella
  // dei ristoranti, aggiungere che se orders.type === "USERS__ORDERS"
  // dare il componente <UserActiveOrders /> senno dare componente
  // <RestaurantActiveOrders /> che ovviamente avra la sua chiamata
  // api al suo interno

  const hasOrders = !isLoading && !!data.orders.length;

  return (
    <>
      {isCmpAccount && isLoading && <RestaurantActiveOrderSkeleton />}
      {!isCmpAccount && isLoading && <UserActiveOrderSkeleton />}

      {hasOrders && data.type === "USER_ORDERS" && (
        <UserActiveOrders orders={data.orders} />
      )}
      {hasOrders && data.type === "RESTAURANT_ORDERS" && (
        <RestaurantActiveOrders orders={data.orders} />
      )}
    </>
  );
};

export default ActiveOrders;
