import UserActiveOrders from "@/components/custom/activeOrders/UserActiveOrders";
import OrderItemsList from "@/components/shared/orderItems/OrderItemsList";
import UserActiveOrderSkeleton from "@/components/skeletons/UserActiveOrderSkeleton";
import ErrorWidget from "@/components/widgets/ErrorWidget";
import {
  useGetActiveOrders,
  useGetPrevOrders,
} from "@/lib/react-query/queries";
import { getOrderDate } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

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

  // const lastOrder = prevOrders?.splice(0);
  const lastOrder = prevOrders?.at(0);
  const canShowLastOrder =
    !areActiveOrdersLoading &&
    !!!activeOrdersData.orders?.length &&
    !!lastOrder;

  return (
    <div className="flex flex-col items-center">
      {/* <div className="active-orders__container max-w-[600px]">
        {areActiveOrdersLoading ? (
          <UserActiveOrderSkeleton />
        ) : (
          <UserActiveOrders orders={activeOrdersData.orders} />
        )}
      </div> */}
      {!canShowLastOrder && (
        <div className="last-order__container w-full mx-auto max-w-[600px]">
          <div className="user-last-order user-widget">
            <h1 className="text-2xl font-semibold self-center">
              Ultimo ordine
            </h1>
            <div className="my-4">
              <figure className="flex gap-3">
                <img
                  src="/imgs/default-restaurant.png"
                  alt={`${lastOrder!.restaurant.name} img`}
                  className="w-[80px] h-[80px] object-cover rounded-xl"
                />
                <div className="grow flex flex-col justify-between">
                  <figcaption className="text-xl font-semibold text-left">
                    {lastOrder!.restaurant.name}
                  </figcaption>
                  <div className="flex-between">
                    <p className="text-white/80 text-lg font-semibold">
                      {getOrderDate(lastOrder!.createdAt)}
                    </p>
                    <div className="flex-center gap-2">
                      <button
                        className="btn py-2 px-5 text-sm
                          bg-home-widget-border-50 hover:bg-home-widget-border-80"
                      >
                        Ordina ancora
                      </button>
                      <Link
                        to={`/user/order/${lastOrder!._id}`}
                        className="btn py-2 px-5 text-sm
                          bg-home-widget-border-50 hover:bg-home-widget-border-80"
                      >
                        Vedi
                      </Link>
                    </div>
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </div>
      )}
      <div className="prev-orders__container user-widget">
        {arePrevOrdersLoading ? (
          <Loader />
        ) : !!prevOrders.length ? (
          <>
            <h2 className="text-2xl font-semibold mb-5">Ordini precedenti</h2>
            <ul className="w-full">
              {prevOrders.map((order) => {
                const orderDate = getOrderDate(order.createdAt);

                return (
                  <li key={order._id} className="flex items-center gap-4">
                    <figure className="shrink-0">
                      <img
                        src={"/imgs/default-restaurant.png"}
                        alt={`${order.restaurant.name}-img`}
                        className="w-[150px] h-[150px] object-cover rounded-2xl"
                      />
                    </figure>
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="">
                        <div className="flex-between">
                          <h3 className="font-semibold text-2xl">
                            {order.restaurant.name}
                          </h3>
                          <h3 className="font-semibold text-2xl">
                            ${order.totalPrice}
                          </h3>
                        </div>
                        <ul className="grid grid-cols-3 my-3 gap-2">
                          <OrderItemsList items={order.items} />
                        </ul>
                      </div>
                      <div className="flex-between gap-3">
                        <p className="text-lg font-semibold text-white/80 self-end">
                          {orderDate}
                        </p>
                        <div className="flex-center gap-2">
                          <button
                            className="btn py-2 px-5 text-sm
                          bg-home-widget-border-50 hover:bg-home-widget-border-80"
                          >
                            Ordina ancora
                          </button>
                          <Link
                            to={`/user/order/${order._id}`}
                            className="btn py-2 px-5 text-sm
                          bg-home-widget-border-50 hover:bg-home-widget-border-80"
                          >
                            Vedi
                          </Link>
                        </div>
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
