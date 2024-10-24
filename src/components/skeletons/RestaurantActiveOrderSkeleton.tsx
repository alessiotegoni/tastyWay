import { Skeleton } from "../ui/skeleton";

const RestaurantActiveOrderSkeleton = () => {
  const orderSkeleton = Array.from({ length: 3 }, (_, i) => (
    <Skeleton
      key={i}
      className="bg-[#2A003E] basis-1/3 w-[180px] h-[100px] rounded-2xl"
    />
  ));

  return (
    <div className="max-w-[800px] mx-auto restaurant-container">
      <div className="flex flex-col gap-3 items-center">
        <Skeleton className="bg-[#2A003E] w-14 h-14" />
        <Skeleton className="bg-[#2A003E] w-[150px] h-[40px]" />
      </div>
      <div className="flex gap-3 mt-4 mb-9">{orderSkeleton}</div>
      <div className="flex-center">
        <Skeleton className="bg-[#2A003E] w-[200px] h-[50px] rounded-3xl" />
      </div>
    </div>
  );
};
export default RestaurantActiveOrderSkeleton;
