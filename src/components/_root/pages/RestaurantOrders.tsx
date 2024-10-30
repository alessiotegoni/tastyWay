import RestaurantOrdersSkeleton from "@/components/skeletons/RestaurantOrdersSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorWidget from "@/components/widgets/ErrorWidget";
import { orderStatuses } from "@/constants";
import { useGetRestaurantOrders } from "@/lib/react-query/queries/restaurantQueries";
import {
  getExpectedTime,
  getOrderSatusStyle,
  getOrderStatusIcon,
} from "@/lib/utils";
import { OrderStatus, RestaurantOrdersFilters } from "@/types/restaurantTypes";
import { XIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RestaurantOrders = () => {
  const defaultFilters: RestaurantOrdersFilters = {
    orderInfo: null,
    statusTypes: [],
  };

  const [input, setInput] = useState("");

  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    if (!input) setFilters({ ...filters, orderInfo: null });
  }, [input]);

  const { data, isLoading, isError, error } = useGetRestaurantOrders(filters);

  const orders = data?.pages.flatMap((p) => p.orders) ?? [];
  const newOrdersLength = orders.filter((o) => o.status === "In attesa").length;

  const handleSetFilters = (os: OrderStatus) =>
    filters.statusTypes.includes(os)
      ? setFilters({
          ...filters,
          statusTypes: filters.statusTypes.filter((s) => s !== os),
        })
      : setFilters({ ...filters, statusTypes: [os, ...filters.statusTypes] });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!input) return;

    setFilters({
      ...filters,
      orderInfo: input ? input : null,
    });
  };

  return (
    <section className="restaurant-orders">
      <div className="container max-w-[600px]">
        <div className="restaurant-widget px-14">
          <div className="text-center">
            {newOrdersLength ? (
              <div className="flex-center gap-5">
                <h2 className="text-5xl font-semibold">{newOrdersLength}</h2>
                <h3 className="text-3xl font-semibold mt-1">
                  {newOrdersLength > 1 ? "Nuovi ordini" : "Nuovo ordine"}
                </h3>
              </div>
            ) : (
              <h2 className="text-4xl font-semibold">Ordini</h2>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="search-restaurant-box mt-4 mb-8 pl-[10px]">
              <img
                src="/icons/order-icon.png"
                alt="location-icon"
                className="w-6 h-6"
              />
              <Input
                type="text"
                placeholder="Nome dell'utente o indirizzo"
                className="widget-input grow"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {!!input && (
                <div
                  className="flex-center w-5 h-5 rounded-full
                bg-x-icon-bg-50 p-1 cursor-pointer"
                  onClick={() => setInput("")}
                >
                  <XIcon />
                </div>
              )}
              <Button type="submit" className="search-btn bg-[#9400DA]">
                Cerca
              </Button>
            </div>
          </form>
          <ul className="order-statuses flex justify-between gap-3">
            {orderStatuses.map((os) => (
              <li onClick={() => handleSetFilters(os)}>
                <Button type="submit">
                  <figure className="flex flex-col items-center">
                    <div
                      className={`w-13 h-13 p-4 rounded-full border ${getOrderSatusStyle(
                        os
                      )} ${
                        filters.statusTypes.includes(os)
                          ? "bg-opacity-100"
                          : "bg-opacity-30"
                      }`}
                    >
                      <img
                        src={getOrderStatusIcon(os)}
                        alt={os}
                        className="w-10 shrink-0"
                      />
                    </div>
                    <figcaption className="text-sm font-medium my-2">
                      {os}
                    </figcaption>
                  </figure>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isLoading && <RestaurantOrdersSkeleton />}
      {!isLoading && !!orders.length && (
        <div className="restaurant-widget max-w-[1000px] min-h-[600px] mx-auto mt-5">
          <ul className="grid md:grid-cols-3 gap-4">
            {orders.map((order) => (
              <li
                key={order.orderId}
                className="bg-[#2A003E] px-4 py-3 rounded-2xl"
              >
                <div className="flex-between">
                  <h3 className="font-semibold text-xl">
                    {order.clientFullName}
                  </h3>
                  <h2 className="font-bold text-2xl">
                    {getExpectedTime(order.expectedTime)}
                  </h2>
                </div>
                <div className="flex-center flex-col mt-3 mb-5">
                  <figure
                    className={`flex-center rounded-full gap-2 ${getOrderSatusStyle(
                      order.status
                    )} border px-3 py-2`}
                  >
                    <img
                      src={getOrderStatusIcon(order.status)}
                      alt={order.status}
                      className="w-6"
                    />
                    <figcaption className="font-semibold">
                      {order.status}
                    </figcaption>
                  </figure>
                  <div className="mt-3 font-medium">{order.address}</div>
                </div>
                <ul className="flex-center flex-wrap gap gap-2 mb-7">
                  {order.items.map((item) => (
                    <li
                      key={item._id}
                      className="bg-[#BA4300] flex-center gap-1 py-2 px-4
                      rounded-full font-medium"
                    >
                      <p className="text-lg font-bold">{item.quantity}.</p>
                      <p>{item.name}</p>
                    </li>
                  ))}
                </ul>
                <div className="flex-between">
                  <h2 className="self-end font-bold text-2xl">
                    ${order.totalPrice}
                  </h2>
                  <Link
                    to={`/my-restaurant/order/${order.orderId}`}
                    className="btn font-semibold py-3 px-5
                  bg-[#9400DA] border-transparent text-sm"
                  >
                    Vedi ordine
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isLoading && !orders.length && !filters && (
        <div className="max-w-[600px] mx-auto">
          <div className="restaurant-widget max-w-[100px] mx-auto my-3"></div>
          <ErrorWidget
            className="restaurant-widget sm:w-full font-semibold"
            title="Non hai ancora nessun ordine"
            subtitle="Aggiungi foto accattivanti dei tuoi piatti per attirare più clienti!"
            btns={[
              {
                id: "prevOrders",
                value: "Ordini precedenti",
                goto: "/my-restaurant/orders?filter=PREV",
                className: "btn bg-[#FC5B00] bg-opacity-50 hover:bg-opacity-70",
              },
              {
                id: "updateMenu",
                value: "Aggiorna menu",
                goto: "/my-restaurant",
                className: "btn bg-[#2A003E] border-transparent",
              },
            ]}
          />
        </div>
      )}
      {!isLoading && !orders.length && filters && (
        <div className="max-w-[600px] mx-auto">
          <div className="restaurant-widget max-w-[100px] mx-auto my-3"></div>
          <ErrorWidget
            className="restaurant-widget sm:w-full font-semibold"
            title="Nesun ordine trovato con questi filtri"
            subtitle={`Filtri attivi => \n ${
              filters.statusTypes.length
                ? `${`Stato dell'ordine: [${filters.statusTypes.join(", ")}]`}`
                : ""
            } ${
              filters.orderInfo
                ? `Nome/indirizzo utente: [${filters.orderInfo}]`
                : ""
            }`}
            btns={[
              {
                id: "resetFilters",
                value: "Resetta filtri",
                className: "btn bg-[#2A003E] border-transparent",
                handleClick: () => setFilters(defaultFilters),
              },
            ]}
          />
        </div>
      )}
    </section>
  );
};
export default RestaurantOrders;
