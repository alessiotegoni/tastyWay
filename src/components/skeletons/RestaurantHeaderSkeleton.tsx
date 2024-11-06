import { Skeleton } from "../ui/skeleton";

const RestaurantHeaderSkeleton = () => (
  <div className="restaurant__header">
    <div className="sm:flex gap-5">
      <Skeleton
        className="w-full sm:w-[150px] h-[250px] sm:h-[150px] rounded-[20px]
      shrink-0 primary-widget-bg"
      />
      <div className="flex flex-col justify-between w-full mt-2 sm:mt-0">
        <div className="">
          <Skeleton className="w-full max-w-[250px] h-[35px] primary-widget-bg" />
          <Skeleton className="w-[200px] h-[25px] mt-2 primary-widget-bg" />
        </div>
        <div className="flex justify-end items-end gap-3 mt-5 sm:mt-0">
          <Skeleton className="basis-2/3 sm:max-w-[200px] h-[50px] primary-widget-bg" />
          <Skeleton className="basis-1/3 sm:max-w-[50px] h-[50px] primary-widget-bg" />
        </div>
      </div>
    </div>
  </div>
);

export default RestaurantHeaderSkeleton;
