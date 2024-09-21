import { Skeleton } from "../ui/skeleton";

const RestaurantSkeleton = () => (
  <li
    className="flex justify-between m-4 restaurant-separator
   relative"
  >
    <div className="col-left flex gap-4 overflow-hidden">
      <Skeleton className="w-[260px] h-[140px] rounded-[30px] primary-widget-bg" />
      <div className="">
        <Skeleton className="w-[200px] h-[30px] primary-widget-bg" />
        <Skeleton className="w-[100px] h-[30px] primary-widget-bg my-4" />
      </div>
    </div>
    <div className="col-right flex flex-col justify-between">
      <div className="flex-center gap-2">
        <Skeleton className="w-[110px] h-[40px] primary-widget-bg" />
        <Skeleton className="w-[110px] h-[40px] primary-widget-bg" />
      </div>
      <Skeleton className="w-[110px] h-[50px]
      rounded-[30px] self-end primary-widget-bg" />
    </div>
  </li>
);

export default RestaurantSkeleton;
