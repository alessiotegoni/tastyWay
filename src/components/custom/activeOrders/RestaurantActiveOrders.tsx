import ErrorWidget from "@/components/widgets/ErrorWidget";
import { getExpectedTime } from "@/lib/utils";
import { RestaurantActiveOrder } from "@/types/restaurantTypes";
import { Link } from "react-router-dom";

const RestaurantActiveOrders = ({
  orders,
}: {
  orders: RestaurantActiveOrder[];
}) => {
  const activeOrdersList = orders.map((order) => {
    const expectedTime = getExpectedTime(order.expectedTime);

    return (
      <li
        key={order.orderId}
        className="bg-[#2A003E] p-4 rounded-3xl xs:min-w-[300px]"
      >
        <div className="flex-between">
          <h3 className="text-xl font-semibold">{order.customerSurname}</h3>
          <h2 className="text-3xl font-bold">{expectedTime}</h2>
        </div>
        <p className="font-normal text-sm mb-6 mt-2">{order.address}</p>
        <div className="flex-between">
          <h4 className="text-lg font-semibold self-end">
            ${order.totalPrice.toFixed(2)}
          </h4>
          <Link
            to={`/my-restaurant/order/${order.orderId}`}
            className="btn bg-[#9400DA] border-0 text-sm font-semibold
            py-2 px-3"
          >
            Vedi ordine
          </Link>
        </div>
      </li>
    );
  });

  return orders.length ? (
    <div className="restaurant-container active-orders">
      <div className="text-center">
        <h2 className="text-5xl font-semibold">{orders.length}</h2>
        <h3 className="text-3xl font-semibold mt-1">
          {orders.length > 1 ? "Ordini attivi" : "Ordine attivo"}
        </h3>
      </div>
      <ul
        className={`${
          orders.length <= 2
            ? "space-y-2 sm:space-y-0 sm:flex-center flex-wrap"
            : "grid"
        }`}
      >
        {activeOrdersList}
      </ul>
      <div className="flex-center">
        <Link
          to={`/my-restaurant/orders`}
          className="btn py-3 px-6 bg-[#2A003E] border-0"
        >
          Vedi tutti gli ordini
        </Link>
      </div>
    </div>
  ) : (
    <ErrorWidget
      className="restaurant-container sm:w-full sm:max-w-[600px] mx-auto"
      title="Non hai nessun ordine attivo"
      subtitle="Aggiungi foto accattivanti dei tuoi piatti per attirare più clienti!"
      btns={[
        {
          id: "prevOrders",
          value: "Ordini precedenti",
          goto: "/my-restaurant/orders?filter=PREV",
          className: "btn bg-[#FC5B00] bg-opacity-50 hover:bg-opacity-70 mt-16",
        },
        {
          id: "updateMenu",
          value: "Aggiorna menu",
          goto: "/my-restaurant",
          className: "btn bg-[#2A003E] border-transparent mt-16",
        },
      ]}
    />
  );
};
export default RestaurantActiveOrders;
