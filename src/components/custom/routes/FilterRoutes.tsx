import { useAddress } from "@/contexts/AddressContext";
import RestaurantFiltersProvider from "@/contexts/RestaurantFiltersContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const FilterRoutes = () => {
  const { pathname } = useLocation();

  const { selectedAddress } = useAddress();

  const content =
    pathname === "/restaurants" && !selectedAddress ? (
      <Navigate to="/" />
    ) : (
      <RestaurantFiltersProvider>
        <Outlet />
      </RestaurantFiltersProvider>
    );

  return content;
};
export default FilterRoutes;
