import RestaurantActiveOrders from "@/components/custom/activeOrders/RestaurantActiveOrders";
import UserActiveOrders from "@/components/custom/activeOrders/UserActiveOrders";
import RestaurantActiveOrderSkeleton from "@/components/skeletons/RestaurantActiveOrderSkeleton";
import UserActiveOrderSkeleton from "@/components/skeletons/UserActiveOrderSkeleton";
import ErrorWidget from "@/components/widgets/ErrorWidget";
import { useAuth } from "@/contexts/AuthContext";
import useAddress from "@/hooks/useAddress";
import { useGetActiveOrders } from "@/lib/react-query/queries/userQueries";
import { Navigate } from "react-router-dom";

const ActiveOrders = () => {
  const { user, isAuthenticated } = useAuth();
  const { selectedAddress } = useAddress();

  const { isCmpAccount, restaurantName } = user!;

  if (isCmpAccount && !restaurantName) return <Navigate to="/" />;

  const { data, isLoading, isError, refetch } = useGetActiveOrders(
    isCmpAccount,
    isAuthenticated
  );

  return (
    <>
      {isCmpAccount && isLoading && <RestaurantActiveOrderSkeleton />}
      {!isCmpAccount && isLoading && <UserActiveOrderSkeleton />}
      {!isLoading && data?.type === "USER_ORDERS" && (
        <UserActiveOrders orders={data.orders} />
      )}
      {!isLoading && data?.type === "RESTAURANT_ORDERS" && (
        <RestaurantActiveOrders orders={data.orders} />
      )}
      {!isLoading && !data?.orders?.length && (
        <ErrorWidget
          title="Non hai ordini attivi"
          subtitle={
            isCmpAccount
              ? "Aggiungi foto accattivanti dei tuoi piatti per attirare più clienti!"
              : `I tuoi ordini attivi appariranno qui, al momento sembra che tu non abbia ancora
               ordinato niente`
          }
          className={`${
            isCmpAccount ? "restaurant-widget" : "user-widget"
          } max-w-[600px] mx-auto`}
          btns={[
            isCmpAccount
              ? {
                  id: "viewAllOrders",
                  value: "Vedi tutti gli ordini",
                  goto: "/my-restaurant/orders",
                  className: `btn bg-[#2A003E] border-transparent mt-6`,
                }
              : {
                  id: "orderNow",
                  value: "Ordina ora",
                  goto: selectedAddress ? "/restaurants" : "/",
                  className: `btn bg-[#ED0000] bg-opacity-50 rounded-full py-3 px-4
                text-sm font-medium border border-[#FF0000] border-opacity-60
                hover:bg-[#ED0000] hover:bg-opacity-50 mt-6`,
                },
          ]}
        />
      )}
      {isError && (
        <ErrorWidget
          title="Errore nel carimento degli ordini attivi"
          subtitle="C'è stato un errore nel caricamento degli ordini attivi. Probabilmente si tratta di un problema temporaneo che si risolverà nel giro di pochi minuti. Se così non fosse, contatta l'assistenza."
          className={`${
            isCmpAccount ? "restaurant-widget" : "user-widget"
          } max-w-[600px] mx-auto`}
          btns={[
            {
              id: "refetchActiveOrders",
              value: "Riprova",
              className: `btn ${
                isCmpAccount
                  ? "bg-[#2A003E] border-transparent"
                  : `bg-[#ED0000] bg-opacity-50 rounded-full py-3 px-6
                  text-sm font-medium border border-[#FF0000] border-opacity-60
                  hover:bg-[#ED0000] hover:bg-opacity-50`
              }`,
              handleClick: refetch,
            },
          ]}
        />
      )}
    </>
  );
};

export default ActiveOrders;
