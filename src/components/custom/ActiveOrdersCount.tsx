import { useGetActiveOrdersCount } from "@/lib/react-query/queries/userQueries";
import { Link } from "react-router-dom";

interface ActiveOrdersCountProps {
  isCmpAccount: boolean;
  isAuthenticated: boolean;
}

const ActiveOrdersCount = ({
  isCmpAccount,
  isAuthenticated,
}: ActiveOrdersCountProps) => {
  const { data: activeOrdersCount } = useGetActiveOrdersCount(
    isCmpAccount,
    isAuthenticated
  );

  return (
    !!activeOrdersCount && (
      <Link
        to="active-orders"
        className={`btn ${
          isCmpAccount ? "restaurant-widget" : "user-widget"
        } h-[45px] flex-center z-50`}
      >
        <figure className="flex-center gap-2">
          <img
            src="/icons/order-icon.png"
            alt="order-icon"
            className="w-6 h-6"
          />
          <figcaption className="font-semibold">
            {isCmpAccount
              ? `${activeOrdersCount} ${
                  activeOrdersCount === 1 ? "nuovo ordine" : "nuovi ordini"
                }`
              : `${activeOrdersCount} ${
                  activeOrdersCount === 1 ? "ordine attivo" : "ordini attivi"
                }`}
          </figcaption>
        </figure>
      </Link>
    )
  );
};

export default ActiveOrdersCount;
