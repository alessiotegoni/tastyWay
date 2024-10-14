import UserActiveOrders from "@/components/custom/activeOrders/UserActiveOrders";
import UserActiveOrderSkeleton from "@/components/skeletons/UserActiveOrderSkeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ErrorWidget from "@/components/widgets/ErrorWidget";
import {
  useGetActiveOrders,
  useGetPrevOrders,
} from "@/lib/react-query/queries";
import { getOrderDate } from "@/lib/utils";
import { Loader } from "lucide-react";

const UserPrevsOrders = () => {
  const { data: activeOrdersData, isLoading: areActiveOrdersLoading } =
    useGetActiveOrders(false, true);

  const {
    data: prevOrdersData,
    isLoading: arePrevOrdersLoading,
    fetchNextPage,
  } = useGetPrevOrders();

  const prevOrders = prevOrdersData?.pages.flatMap((p) => p.orders) ?? [];

  // TODO: last order

  // TODO: add observer

  return (
    <div className="flex flex-col items-center">
      <div className="active-orders__container max-w-[600px]">
        {areActiveOrdersLoading ? (
          <UserActiveOrderSkeleton />
        ) : (
          <UserActiveOrders orders={activeOrdersData.orders} />
        )}
      </div>
      <div className="prev-orders__container user-widget">
        {arePrevOrdersLoading ? (
          <Loader />
        ) : !!prevOrders.length ? (
          <>
            <h2 className="text-2xl font-semibold mb-5">Ordini precedenti</h2>
            <ul className="w-full grid md:grid-cols-2">
              {prevOrders.map((order) => {
                const orderDate = getOrderDate(order.createdAt);

                return (
                  <li key={order._id} className="flex gap-4">
                    <figure>
                      <img
                        src={"/imgs/default-restaurant.png"}
                        alt={`${order.restaurant.name}-img`}
                        className="w-[120px] h-[120px] object-cover rounded-2xl"
                      />
                    </figure>
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="">
                        <h3 className="text-left font-semibold text-xl">
                          {order.restaurant.name}
                        </h3>
                        <ul className="mt-3 gap-2">
                          {order.items.map((item) => (
                            <li key={item._id} className="flex gap-1">
                              <p className="w-7 h-7 flex-center rounded-md bg-primary-50">
                                {item.quantity}
                              </p>
                              <p
                                className="text-sm flex-center px-3 font-semibold
                            rounded-md bg-primary-50"
                              >
                                {item.name}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-2xl">
                          ${order.totalPrice}
                        </p>
                        <p className="text-sm font-semibold text-white/80">
                          {orderDate}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <ErrorWidget
            className="sm:py-2"
            title="Non ci sono ordini passati al momento. Il tuo primo ordine è in corso e presto sarà visibile qui."
            subtitle="Non ci sono ordini passati perché il tuo primo ordine è in elaborazione. Presto potrai vedere i dettagli qui. Nel frattempo, puoi seguire lo stato del tuo ordine o esplorare altri ristoranti."
            btns={[
              {
                id: "discoverRestaurants",
                value: "Scopri i ristoranti aperti ora",
                className: "bg-[#ec010184] border border-[#fe0000b3] px-4",
                goto: "/restaurants",
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default UserPrevsOrders;
