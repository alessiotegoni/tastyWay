import { Skeleton } from "../ui/skeleton";

const RestaurantItemSkeleton = () => (
  <li className="restaurant__item restaurant-separator">
    <div className="item__body sm:flex gap-5">
      <Skeleton className="w-[130px] h-[130px] rounded-[20px] primary-widget-bg" />
      <div className="mt-2 mb-5 sm:mt-0 sm:mb-0">
        <Skeleton className="w-[150px] h-[35px] primary-widget-bg" />
        <Skeleton className="w-[200px] lg:w-[300px] h-[20px] mt-2 primary-widget-bg" />
      </div>
    </div>
    <div className="flex sm:flex-col justify-between items-center sm:items-end">
      <Skeleton className="w-[40px] h-[40px] primary-widget-bg" />
      <Skeleton className="w-[50px] h-[50px] rounded-full primary-widget-bg" />
    </div>
  </li>
);
export default RestaurantItemSkeleton;
