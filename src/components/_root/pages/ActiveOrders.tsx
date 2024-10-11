import UserActiveOrderSkeleton from "@/components/skeletons/userActiveOrderSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuth } from "@/contexts/AuthContext";
import { useGetActiveOrders } from "@/lib/react-query/queries";
import { getExpectedTime, getOrderStatusMsg } from "@/lib/utils";
import { UserActiveOrder } from "@/types/userTypes";

const ActiveOrders = () => {
  const { user, isAuthenticated } = useAuth();

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetActiveOrders(user!.isCmpAccount, isAuthenticated);

  console.log(orders);

  // TODO: aggiungere un componente per la lista degli item,
  // shared tra gli item del carrello e gli item dell'ordine dell'utente

  return isLoading ? (
    <UserActiveOrderSkeleton />
  ) : (
    <Carousel className="w-full select-none">
      <CarouselContent>
        {orders?.map((order: UserActiveOrder) => {
          const orderStatus = getOrderStatusMsg(order.status);
          const expectedTime = getExpectedTime(order.expectedTime);

          return (
            <CarouselItem key={order.id}>
              <div className="user-widget sm:px-20">
                <h1 className="sm:text-[24px] font-semibold">{orderStatus}</h1>
                <div className="expected__time">
                  <h2 className="font-semibold">
                    Orario previsto:
                    <span className="ml-2 text-[22px]">{expectedTime}</span>
                  </h2>
                </div>
                <h4 className="font-semibold">Il tuo ordine</h4>
                <ul className="mt-2 mb-[23px] flex-center gap-2">
                  {order.items.map((item) => (
                    <li
                      className="item rounded-xl py-2 p-3 bg-[#ff232355] min-w-[190px]"
                      key={item._id}
                    >
                      <div className="w-full flex gap-2">
                        <figure className="shrink-0 w-[37px] h-[37px] self-center">
                          <img
                            src={
                              item.img ?? "/imgs/default-restaurant-item.png"
                            }
                            alt={item.name}
                          />
                        </figure>
                        <div className="w-full flex flex-col justify-between">
                          <figcaption className="text-[13px] font-semibold self-start">
                            {item.name}
                          </figcaption>
                          <div className="flex-between mt-2">
                            <p className="text-sm">x{item.quantity}</p>
                            <h2 className="font-medium text-sm">
                              ${item.price}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <h1 className="font-semibold text-[27px]">
                  Totale:
                  <span className="ml-2 text-[30px]">${order.totalPrice}</span>
                </h1>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="btn disabled:opacity-0 bg-[#ed0000a3] backdrop-blur-2xl hover:bg-[#ed0000d3] border-0" />
      <CarouselNext className="btn disabled:opacity-0 bg-[#ed0000a3] backdrop-blur-2xl hover:bg-[#ed0000d3] border-0" />
    </Carousel>
  );
};

export default ActiveOrders;
