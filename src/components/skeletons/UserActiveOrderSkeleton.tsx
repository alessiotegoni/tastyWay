import { Skeleton } from "../ui/skeleton";
import OrderItemSkeleton from "./OrderItemSkeleton";

const UserActiveOrderSkeleton = () => (
  <div className="user-widget w-[600px] gap-3">
    <Skeleton className="w-[420px] h-[36px] bg-[#ed0000b6]" />
    <Skeleton className="w-[220px] h-[40px] bg-[#ed0000b6]" />
    <Skeleton className="w-[90px] h-[24px] bg-[#ed0000b6] mt-2" />
    <ul className="flex-center gap-2">
      <OrderItemSkeleton length={2} />
    </ul>
    <Skeleton className="w-[150px] h-[45px] bg-[#ed0000b6] mt-3" />
  </div>
);

export default UserActiveOrderSkeleton;
