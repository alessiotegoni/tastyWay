import { DeleteOrderAlert } from "@/components/custom/my-restaurant/DeleteOrderAlert";
import { SelectOrderStatus } from "@/components/custom/my-restaurant/OrderStatusSelect";
import OrderItemsList from "@/components/shared/orderItems/OrderItemsList";
import RestaurantActiveOrderSkeleton from "@/components/skeletons/RestaurantActiveOrderSkeleton";
import ErrorWidget from "@/components/widgets/ErrorWidget";
import { useGetRestaurantOrder } from "@/lib/react-query/queries/restaurantQueries";
import {
  getExpectedTime,
  getOrderSatusStyle,
  getOrderStatusIcon,
} from "@/lib/utils";
import { useParams } from "react-router-dom";

const RestaurantUserOrder = () => {
  const { orderId } = useParams();

  const { data: order, isLoading, error } = useGetRestaurantOrder(orderId);

  return (
    <main className="restaurant-user-order pt-0">
      {isLoading ? (
        <RestaurantActiveOrderSkeleton />
      ) : order ? (
        <>
          <div className="restaurant-widget max-w-[700px] mx-auto mt-16 xl:mt-0">
            <div className="text-center">
              <p className="text-white/70 font-semibold text-lg">Nome</p>
              <h2 className="text-lg sm:text-2xl font-semibold mt-2 mb-4">
                {order.clientFullName}
              </h2>
            </div>
            <div className="text-center">
              <p className="text-white/70 font-semibold text-lg">In via</p>
              <h2 className="text-lg sm:text-2xl font-semibold mt-2 mb-4">
                {order.address}
              </h2>
            </div>
            <div className="text-center">
              <p className="text-white/70 font-semibold text-lg">Per l'ora</p>
              <h2 className="text-3xl font-semibold mt-2 mb-4">
                {getExpectedTime(order.expectedTime)}
              </h2>
            </div>
            <div className="text-center">
              <p className="text-white/70 font-semibold text-lg">Totale</p>
              <h2 className="text-xl sm:text-3xl font-semibold mt-2">
                ${order.totalPrice.toFixed(2)}
              </h2>
            </div>
          </div>
          <div
            className={`w-fit mx-auto px-4 py-3 sm:px-6 border rounded-full
              my-3 sm:my-4 text-xl sm:text-2xl font-semibold flex-center gap-2
              ${getOrderSatusStyle(order.status)}`}
          >
            <img
              src={getOrderStatusIcon(order.status)}
              alt={order.status}
              width={30}
            />
            <p>{order.status}</p>
          </div>
          <div
            className="restaurant-widget max-w-[1000px] mx-auto min-h-[420px]
      flex flex-col justify-between"
          >
            <div>
              <h2 className="text-center text-3xl font-semibold mb-4">
                Ordine
              </h2>
              <OrderItemsList
                items={order.items}
                className="grow sm:grow-0"
                itemImgSize={80}
                fontSize={18}
              />
            </div>
            <div className="flex-center flex-wrap-reverse gap-3 mt-6">
              <DeleteOrderAlert orderId={order.orderId} />
              <SelectOrderStatus
                currentStatus={order.status}
                orderId={order.orderId}
              />
            </div>
          </div>
        </>
      ) : (
        <ErrorWidget
          className="restaurant-widget max-w-[600px] mx-auto mt-20"
          error={error}
          title="Ordine non trovato"
          subtitle="Quest'ordine e' stato eliminato o l'utente che l'ha creato non esiste piu"
          btns={[
            {
              id: "naviagateBack",
              value: "Torna indietro",
              goto: -1,
              className: "btn border-transparent bg-[#2A003E]",
            },
          ]}
        />
      )}
    </main>
  );
};
export default RestaurantUserOrder;
