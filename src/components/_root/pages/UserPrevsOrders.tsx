import UserActiveOrders from "@/components/custom/activeOrders/UserActiveOrders";
import OrderItemsList from "@/components/shared/orderItems/OrderItemsList";
import UserActiveOrderSkeleton from "@/components/skeletons/UserActiveOrderSkeleton";
import UserPrevOrderSkeleton from "@/components/skeletons/UserPrevOrderSkeleton";
import ErrorWidget from "@/components/widgets/ErrorWidget";
import {
  useGetActiveOrders,
  useGetPrevOrders,
} from "@/lib/react-query/queries/userQueries";
import { formatRestaurantName, getOrderDate } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { UserPrevOrder } from "@/types/userTypes";

const UserPrevsOrders = () => {
  const { handleSetCart } = useCart();

  const navigate = useNavigate();

  const { inView, ref } = useInView({ triggerOnce: true, threshold: 0.5 });

  const { data: activeOrdersData, isLoading: areActiveOrdersLoading } =
    useGetActiveOrders(false, true);

  const {
    data: prevOrdersData,
    isLoading: arePrevOrdersLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetPrevOrders();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  const activeOrders = activeOrdersData?.orders ?? [];
  const prevOrders = prevOrdersData?.pages.flatMap((p) => p.orders) ?? [];

  const hasNoOrders =
    !areActiveOrdersLoading &&
    !activeOrders.length &&
    !arePrevOrdersLoading &&
    !prevOrders.length;

  const canShowLastOrder =
    !areActiveOrdersLoading && !activeOrdersData.orders?.length;

  const lastOrder = canShowLastOrder ? prevOrders.splice(0, 1).at(0) : null;

  const handleOrderAgain = ({ items, restaurant }: UserPrevOrder) => {
    items.forEach((i) =>
      handleSetCart({
        restaurantId: restaurant.id,
        itemId: i._id,
        img: i.img!,
        name: i.name,
        price: i.price,
        type: "ADD",
      })
    );

    navigate(`/restaurants/${formatRestaurantName(restaurant.name)}`);
  };

  return (
    <main className="user-orders flex flex-col items-center">
      <div className="container">
        {areActiveOrdersLoading ? (
          <div className="active-orders__container">
            <UserActiveOrderSkeleton />
          </div>
        ) : (
          <div className="active-orders__container">
            <UserActiveOrders orders={activeOrders} />
          </div>
        )}
        {canShowLastOrder && !!lastOrder && (
          <div className="last-order__container">
            <div className="user-last-order user-widget">
              <h1 className="text-2xl font-semibold self-center">
                Ultimo ordine
              </h1>
              <div className="mt-4 mb-3">
                <div className="flex gap-3">
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
                        <Button
                          className="btn py-2 px-5 text-sm
                          bg-home-widget-border-50 hover:bg-home-widget-border-80"
                        >
                          Ordina ancora
                        </Button>
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
                </div>
              </div>
              <h3 className="text-xl font-semibold">Il tuo ordine</h3>
              <ul
                className={`flex flex-wrap gap-2 ${
                  lastOrder!.items.length <= 1 ? "justify-center" : ""
                } mt-2 mb-4`}
              >
                <OrderItemsList items={lastOrder!.items} />
              </ul>
              <h3 className="font-semibold text-3xl">
                Totale: <span>${lastOrder!.totalPrice}</span>
              </h3>
            </div>
          </div>
        )}
        {arePrevOrdersLoading && (
          <div className="prev-orders__container user-widget mt-3">
            <UserPrevOrderSkeleton />
          </div>
        )}
        {!arePrevOrdersLoading && !!prevOrders.length && (
          <>
            <div className="flex-center mt-3">
              <h2
                className="user-widget sm:text-xl font-semibold pt-3 pb-1 px-6
              w-fit border-b-0 rounded-none rounded-tr-3xl rounded-tl-3xl"
              >
                Ordini precedenti
              </h2>
            </div>
            <div className="prev-orders__container user-widget border-t-0">
              <ul className="w-full space-y-4 md:space-y-2">
                {prevOrders.map((order, i) => {
                  const orderDate = getOrderDate(order.createdAt);

                  return (
                    <li
                      key={order._id}
                      className="md:flex items-center gap-4"
                      ref={(i + 1) % 7 === 0 ? ref : null}
                    >
                      <figure className="shrink-0">
                        <img
                          src={"/imgs/default-restaurant.png"}
                          alt={`${order.restaurant.name}-img`}
                          className="w-full md:w-[150px] md:h-[150px] object-cover rounded-2xl"
                        />
                      </figure>
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="">
                          <div className="flex-between mt-3 md:mt-0">
                            <h3 className="font-semibold text-xl sm:text-2xl">
                              {order.restaurant.name}
                            </h3>
                            <h3 className="font-medium sm:font-semibold text-base sm:text-2xl">
                              ${order.totalPrice}
                            </h3>
                          </div>
                          <ul className="flex flex-wrap md:grid grid-cols-3 my-3 gap-2">
                            <OrderItemsList
                              items={order.items}
                              className="min-w-[190px]"
                            />
                          </ul>
                        </div>
                        <div className="sm:flex-between gap-3 mt-1 sm:mt-0">
                          <p className="text-right sm:text-left text-sm lg:text-lg font-semibold text-white/80 self-end">
                            {orderDate}
                          </p>
                          <div className="flex-center gap-2 mt-3 sm:mt-0">
                            <Button
                              className="btn rounded-xl basis-2/3 py-2 px-5 text-sm
                        bg-home-widget-border-50 hover:bg-home-widget-border-80"
                              onClick={() => handleOrderAgain(order)}
                            >
                              Ordina ancora
                            </Button>
                            <Link
                              to={`/user/orders/${order._id}`}
                              className="btn rounded-xl basis-1/3 py-2 px-5 text-sm
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
            </div>
          </>
        )}
        {hasNoOrders && (
          <ErrorWidget
            className="sm:w-[530px] sm:py-5 user-widget mt-4 mx-auto"
            title="Non hai ancora effettuato nessun ordine."
            subtitle="Nessun ordine trovato. Esplora i migliori ristoranti nella tua zona e fai il tuo primo ordine in pochi clic!"
            btns={[
              {
                id: "orderNow",
                value: "Ordina ora",
                goto: "/restaurants",
                className: "bg-[#ec010184] border border-[#fe0000b3] px-8",
              },
            ]}
          />
        )}
      </div>
    </main>
  );
};

export default UserPrevsOrders;
