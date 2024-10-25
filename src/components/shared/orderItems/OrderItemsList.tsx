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
  fontSize
}: OrderItemsListProps) =>
  items.map((item) => (
    <OrderItemListItem
      item={item}
      className={className}
      itemImgSize={itemImgSize}
      fontSize={fontSize}
    />
  ));

export default OrderItemsList;
