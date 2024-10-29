import { Skeleton } from "../ui/skeleton";

const RestaurantOrdersSkeleton = () => (
  <div className="restaurant-widget max-w-[1000px] mx-auto mt-5">
    <ul className="grid md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }, (_, i) => (
        <li key={i}>
          <Skeleton className="p-3 rounded-2xl bg-[#2A003E]">
            <div className="flex-between">
              <Skeleton className="w-32 h-7 bg-[#3c0f51b7]" />
              <Skeleton className="w-20 h-7 bg-[#3c0f51b7]" />
            </div>
            <div className="flex-center flex-col my-4">
              <Skeleton className="w-[100px] h-7 bg-[#3c0f51b7]" />
              <Skeleton className="w-[130px] h-4 bg-[#3c0f51b7] mt-3" />
            </div>
            <ul className="flex gap-2 mb-5">
              {Array.from({ length: 2 }, (_, i) => (
                <li key={i} className="basis-1/2">
                  <Skeleton className="h-8 bg-[#3c0f51b7]" />
                </li>
              ))}
            </ul>
            <div className="flex-between">
              <Skeleton className="w-[75px] h-6 bg-[#3c0f51b7]" />
              <Skeleton className="w-[106px] h-[38px] bg-[#3c0f51b7]" />
            </div>
          </Skeleton>
        </li>
      ))}
    </ul>
  </div>
);
export default RestaurantOrdersSkeleton;
