import { type OrderItem } from "@/types/restaurantTypes";

interface OrderItemProps {
  item: OrderItem;
}

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <li className="item rounded-xl py-2 p-3 bg-[#ff232355]" key={item._id}>
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
  );
};
export default OrderItem;
