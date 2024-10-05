import { Skeleton } from "../ui/skeleton";

const RestaurantItemSkeleton = () => (
  <li className="restaurant__item restaurant-separator">
    <div className="item__body flex gap-5">
      <Skeleton className="w-[130px] h-[130px] rounded-[20px] primary-widget-bg" />
      <div className="">
        <Skeleton className="w-[200px] h-[35px] primary-widget-bg" />
        <Skeleton className="w-[280px] h-[20px] mt-2 primary-widget-bg" />
      </div>
    </div>
    <Skeleton className="w-[40px] h-[40px] primary-widget-bg" />
  </li>
);
export default RestaurantItemSkeleton;
