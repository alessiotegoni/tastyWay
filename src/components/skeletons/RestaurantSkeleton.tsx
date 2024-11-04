import { Skeleton } from "../ui/skeleton";

const RestaurantSkeleton = () => (
  <li
    className="md:flex justify-between m-4 restaurant-separator
   relative md:gap-5"
  >
    <div className="col-left sm:flex gap-4 overflow-hidden">
      <Skeleton
        className="shrink-0 aspect-video
      sm:w-[260px] sm:h-[140px] rounded-[30px] primary-widget-bg"
      />
      <div className="grow mt-3 sm:mt-0">
        <Skeleton className="max-w-[300px] h-[30px] md:w-[200px] primary-widget-bg" />
        <Skeleton className="max-w-[150px] md:w-[100px] h-[30px] primary-widget-bg my-4" />
      </div>
    </div>
    <div
      className="col-right flex flex-col xs:flex-row md:flex-col
    justify-between mt-4 md:mt-0 gap-2 sm:gap-0"
    >
      <div className="flex xs:flex-center gap-2">
        <Skeleton className="w-[100px] h-[40px] primary-widget-bg" />
        <Skeleton className="w-[100px] h-[40px] primary-widget-bg" />
      </div>
      <Skeleton
        className="w-full min-w-[110px] xs:max-w-[110px] h-[50px] mt-4 xs:mt-0
      xs:rounded-[30px] self-end primary-widget-bg"
      />
    </div>
  </li>
);

export default RestaurantSkeleton;
