import RestaurantsList from "@/components/custom/restaurants/RestaurantsList";
import FiltersDropdown from "@/components/shared/FiltersPopover";
import Navbar from "@/components/shared/Navbar/Navbar";
import RestaurantsWidget from "@/components/widgets/RestaurantsWidget";
import { useAddress } from "@/contexts/AddressContext";
import { useRestaurantFilters } from "@/contexts/RestaurantFiltersContext";
import { useGetRestaurants } from "@/lib/react-query/queries";
import { useEffect } from "react";

const Restaurants = () => {
  const { selectedAddress } = useAddress();

  const { filters, removeFilters } = useRestaurantFilters();

  const { data, error, isError, isFetching, fetchNextPage, hasNextPage } =
    useGetRestaurants(selectedAddress, filters);

  useEffect(() => {
    return () => removeFilters();
  }, []);

  return (
    <section className="all-restaurants">
      <Navbar pageNum={3} />
      <main className="flex flex-col items-center gap-3">
        <RestaurantsWidget />
        <FiltersDropdown />
        <RestaurantsList
          data={data}
          isFetching={isFetching}
          fetchNextPage={fetchNextPage}
        />
      </main>
    </section>
  );
};
export default Restaurants;
