import { type OrderItem } from "@/types/restaurantTypes";
import OrderItemListItem from "./OrderItem";

interface OrderItemsListProps {
  items: OrderItem[];
}

const OrderItemsList = ({ items }: OrderItemsListProps) =>
  items.map((item) => <OrderItemListItem item={item} />);

export default OrderItemsList;
