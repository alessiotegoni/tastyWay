import { Skeleton } from "../ui/skeleton";
import OrderItemSkeleton from "./OrderItemSkeleton";

const UserPrevOrderSkeleton = () => (
  <ul className="w-full space-y-6 md:space-y-3">
    {Array.from({ length: 3 }, (_, i) => (
      <li key={i}>
        <div className="md:flex gap-2">
          <Skeleton className="md:w-[150px] h-[220px] md:h-[150px] bg-[#ed0000b6]" />
          <div className="grow flex flex-col justify-between">
            <div className="flex-between mt-2 md:mt-0">
              <Skeleton className="w-full max-w-[350px] md:max-w-[170px] h-[32px] bg-[#ed0000b6]" />
              <Skeleton className="w-[40px] h-[30px] bg-[#ed0000b6]" />
            </div>
            <ul className="flex gap-2 my-3 md:my-0">
              <OrderItemSkeleton length={1} />
            </ul>
            <div className="sm:flex-between">
              <div className="flex justify-end mb-2 sm:mb-0">
                <Skeleton className="w-[70px] h-[30px] bg-[#ed0000b6]" />
              </div>
              <div className="flex-center gap-2">
                <Skeleton className="basis-2/3 w-[135px] h-[40px] bg-[#ed0000b6]" />
                <Skeleton className="basis-1/3 w-[70px] h-[40px] bg-[#ed0000b6]" />
              </div>
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default UserPrevOrderSkeleton;
