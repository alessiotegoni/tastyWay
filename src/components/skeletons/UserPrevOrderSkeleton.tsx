import { Skeleton } from "../ui/skeleton";
import OrderItemSkeleton from "./OrderItemSkeleton";

const UserPrevOrderSkeleton = () => (
  <ul className="w-full space-y-3">
    {Array.from({ length: 3 }, (_, i) => (
      <li key={i}>
        <div className="flex gap-2">
          <Skeleton className="w-[150px] h-[150px] bg-[#ed0000b6]" />
          <div className="grow flex flex-col justify-between">
            <div className="flex-between">
              <Skeleton className="w-[170px] h-[32px] bg-[#ed0000b6]" />
              <Skeleton className="w-[40px] h-[30px] bg-[#ed0000b6]" />
            </div>
            <ul className="flex gap-2">
              <OrderItemSkeleton length={2} />
            </ul>
            <div className="flex-between">
              <Skeleton className="w-[40px] h-[30px] bg-[#ed0000b6]" />
              <div className="flex-center gap-2">
                <Skeleton className="w-[135px] h-[40px] bg-[#ed0000b6]" />
                <Skeleton className="w-[70px] h-[40px] bg-[#ed0000b6]" />
              </div>
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default UserPrevOrderSkeleton;
