import { Skeleton } from "../ui/skeleton";

const RestaurantHeaderSkeleton = () => (
  <div className="restaurant__header">
    <div className="flex gap-5">
      <Skeleton className="w-[150px] h-[150px] rounded-[20px]
      shrink-0 primary-widget-bg" />
      <div className="flex flex-col justify-between w-full">
        <div className="">
          <Skeleton className="w-[200px] h-[45px] primary-widget-bg" />
          <Skeleton className="w-[200px] h-[25px] mt-2 primary-widget-bg" />
        </div>
        <div className="flex justify-end items-end gap-3">
          <Skeleton className="w-[200px] h-[50px] primary-widget-bg" />
          <Skeleton className="w-[50px] h-[50px] primary-widget-bg" />
        </div>
      </div>
    </div>
  </div>
);

export default RestaurantHeaderSkeleton;
