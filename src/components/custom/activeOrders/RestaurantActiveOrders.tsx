import { getExpectedTime } from "@/lib/utils";
import { RestaurantActiveOrder } from "@/types/restaurantTypes";
import { Link } from "react-router-dom";

const RestaurantActiveOrders = ({
  orders,
}: {
  orders: RestaurantActiveOrder[];
}) =>
  orders.length && (
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
        {orders.map((order) => (
          <li
            key={order.orderId}
            className="bg-[#2A003E] p-4 rounded-3xl xs:min-w-[300px]"
          >
            <div className="flex-between">
              <h3 className="text-xl font-semibold">{order.customerSurname}</h3>
              <h2 className="text-3xl font-bold">
                {getExpectedTime(order.expectedTime)}
              </h2>
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
        ))}
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
  );
export default RestaurantActiveOrders;
