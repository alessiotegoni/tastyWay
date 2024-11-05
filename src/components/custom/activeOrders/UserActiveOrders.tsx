import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getExpectedTime, getOrderStatusMsg } from "@/lib/utils";
import { UserActiveOrder } from "@/types/userTypes";

const UserActiveOrders = ({ orders }: { orders: UserActiveOrder[] }) => (
  <Carousel className="max-w-[650px] w-full mx-auto select-none">
    <CarouselContent>
      {orders.map((order) => {
        const orderStatus = getOrderStatusMsg(order.status);
        const expectedTime = getExpectedTime(order.expectedTime);

        return (
          <CarouselItem key={order.id} className="user-order__container">
            <div className="flex-center gap-2 mb-3">
              <div className="order__address flex-center gap-2">
                <img
                  width={25}
                  height={25}
                  src="/icons/delivery-truck-icon.png"
                  alt="delivery-truck-icon"
                />
                <p className="text-xs xs:text-sm">{order.address}</p>
              </div>
            </div>
            <div className="user-widget px-4 xs:px-10 sm:px-16">
              <h1 className="text-lg xs:text-xl sm:text-[24px] font-semibold">
                {orderStatus}
              </h1>
              <div className="expected__time">
                <h2 className="font-semibold">
                  Orario previsto:
                  <span className="ml-2 text-[22px]">{expectedTime}</span>
                </h2>
              </div>
              <h4 className="font-semibold">Il tuo ordine</h4>
              <ul className="flex-center flex-wrap gap-2 mt-2 mb-[23px]">
                {order.items.map((item) => (
                  <li
                    className="item rounded-xl py-2 p-3 bg-[#ff232355] min-w-[190px]"
                    key={item._id}
                  >
                    <div className="w-full flex gap-2">
                      <figure className="shrink-0 w-[37px] h-[37px] self-center">
                        <img
                          src={item.img ?? "/imgs/default-restaurant-item.png"}
                          alt={item.name}
                        />
                      </figure>
                      <div className="w-full flex flex-col justify-between">
                        <figcaption className="text-[13px] font-semibold self-start">
                          {item.name}
                        </figcaption>
                        <div className="flex-between mt-2">
                          <p className="text-sm">x{item.quantity}</p>
                          <h2 className="font-medium text-sm">${item.price}</h2>
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
    <CarouselPrevious className="btn disabled:opacity-0 bg-[#ed0000a3] backdrop-blur-2xl hover:bg-[#ed0000d3] border-0 -left-3 md:-left-12" />
    <CarouselNext className="btn disabled:opacity-0 bg-[#ed0000a3] backdrop-blur-2xl hover:bg-[#ed0000d3] border-0 -right-3 md:-right-12" />
  </Carousel>
);

export default UserActiveOrders;
