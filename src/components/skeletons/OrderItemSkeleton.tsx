import { Skeleton } from "../ui/skeleton";

const OrderItemSkeleton = ({ length }: { length: number }) =>
  Array.from({ length }, (_, i) => (
    <Skeleton
      key={i}
      className="flex-center gap-2 w-[190px] h-[63px] bg-[#ed0000b6]"
    />
  ));

export default OrderItemSkeleton;
