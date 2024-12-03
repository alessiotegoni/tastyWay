import { type OrderItem } from "@/types/restaurantTypes";
import OrderItemListItem from "./OrderItem";

interface OrderItemsListProps {
  items: OrderItem[];
  className?: string;
  itemImgSize?: number;
  fontSize?: number;
}

const OrderItemsList = ({
  items,
  className,
  itemImgSize,
  fontSize,
}: OrderItemsListProps) => (
  <ul
    className="flex flex-col md:items-stretch xs:flex-row
      gap-2 mt-2 mb-[23px] xs:flex-center xs:flex-wrap"
  >
    {items.map((item) => (
      <OrderItemListItem
        key={item._id}
        item={item}
        className={className}
        itemImgSize={itemImgSize}
        fontSize={fontSize}
      />
    ))}
  </ul>
);

export default OrderItemsList;
