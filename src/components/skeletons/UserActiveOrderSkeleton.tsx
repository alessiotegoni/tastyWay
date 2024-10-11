import { Skeleton } from "../ui/skeleton";

const UserActiveOrderSkeleton = () => {
  const itemsSkeletons = Array.from({ length: 2 }, (_, i) => (
    <Skeleton
      key={i}
      className="flex-center gap-2 w-[190px] h-[63px] bg-[#ed0000b6]"
    />
  ));

  return (
    <div className="user-widget gap-3">
      <Skeleton className="w-[420px] h-[36px] bg-[#ed0000b6]" />
      <Skeleton className="w-[220px] h-[40px] bg-[#ed0000b6]" />
      <Skeleton className="w-[90px] h-[24px] bg-[#ed0000b6] mt-2" />
      <ul className="flex-center gap-2">{itemsSkeletons}</ul>
      <Skeleton className="w-[150px] h-[45px] bg-[#ed0000b6] mt-3" />
    </div>
  );
};
export default UserActiveOrderSkeleton;
