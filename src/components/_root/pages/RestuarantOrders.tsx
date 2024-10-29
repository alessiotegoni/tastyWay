import RestaurantOrdersSkeleton from "@/components/skeletons/RestaurantOrdersSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorWidget from "@/components/widgets/ErrorWidget";
import { orderStatuses } from "@/constants";
import { useGetRestaurantOrders } from "@/lib/react-query/queries/restaurantQueries";
import { getOrderSatusStyle } from "@/lib/utils";
import { OrderStatus, RestaurantOrdersFilters } from "@/types/restaurantTypes";
import { FormEvent, useState } from "react";

const RestuarantOrders = () => {
  const defaultFilters: RestaurantOrdersFilters = {
    orderInfo: null,
    statusTypes: [],
  };

  const [filters, setFilters] = useState(defaultFilters);

  console.log(filters);

  const { data, isLoading, isError, error } = useGetRestaurantOrders(filters);

  const orders = data?.pages.flatMap((p) => p.orders) ?? [];
  const newOrders = orders.filter((o) => o.status === "In attesa");

  const handleSetFilters = (os: OrderStatus) =>
    orders.length &&
    (filters.statusTypes.includes(os)
      ? setFilters({
          ...filters,
          statusTypes: filters.statusTypes.filter((s) => s !== os),
        })
      : setFilters({ ...filters, statusTypes: [os, ...filters.statusTypes] }));

  return (
    <section className="restaurant-orders">
      <div className="container max-w-[600px]">
        <div className="restaurant-widget px-14">
          <div className="text-center">
            {newOrders.length ? (
              <>
                <h2 className="text-5xl font-semibold">{newOrders.length}</h2>
                <h3 className="text-3xl font-semibold mt-1">Nuovi ordini</h3>
              </>
            ) : (
              <h2 className="text-4xl font-semibold">Ordini</h2>
            )}
          </div>
          <form>
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
                onChange={(e) =>
                  !!orders.length &&
                  setFilters({
                    ...filters,
                    orderInfo: e.target.value.length ? e.target.value : null,
                  })
                }
              />
              <Button type="button" className="search-btn bg-[#9400DA]">
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
                        filters.statusTypes.includes(os) ? "bg-opacity-100" : ""
                      }`}
                    >
                      <img
                        src={`/icons/${os
                          .toLowerCase()
                          .replaceAll(" ", "-")}-icon.png`}
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
      {isLoading && !!orders.length && (
        <div className="restaurant-widget max-w-[1000px] mx-auto mt-5">
          <ul className="grid md:grid-cols-3 gap-4"></ul>
        </div>
      )}
      {!orders.length && !isLoading && (
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
    </section>
  );
};
export default RestuarantOrders;
