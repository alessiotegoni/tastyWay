import { Skeleton } from "../ui/skeleton";
import OrderItemSkeleton from "./OrderItemSkeleton";

const UserActiveOrderSkeleton = () => (
  <div className="user-widget md:w-[600px] mx-auto gap-3 mt-16 xl:mt-0">
    <Skeleton className="w-full sm:w-[420px] h-[36px] bg-[#ed0000b6]" />
    <Skeleton className="w-full max-w-[220px] h-[40px] bg-[#ed0000b6]" />
    <Skeleton className="w-[90px] h-[24px] bg-[#ed0000b6] mt-2" />
    <ul className="flex-center gap-2 flex-wrap">
      <OrderItemSkeleton length={1} />
    </ul>
    <Skeleton className="w-[150px] h-[45px] bg-[#ed0000b6] mt-3" />
  </div>
);

export default UserActiveOrderSkeleton;
