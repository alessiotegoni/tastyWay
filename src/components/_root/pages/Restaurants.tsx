import RestaurantsList from "@/components/custom/restaurants/RestaurantsList";
import FiltersDropdown from "@/components/shared/FiltersPopover";
import Navbar from "@/components/shared/Navbar/Navbar";
import ErrorWidget from "@/components/widgets/ErrorWidget";
import RestaurantsWidget from "@/components/widgets/RestaurantsWidget";
import { useAddress } from "@/contexts/AddressContext";
import { useRestaurantFilters } from "@/contexts/RestaurantFiltersContext";
import { useGetRestaurants } from "@/lib/react-query/queries";
import { getInvalidAddressErrProps } from "@/lib/utils";
import { useEffect } from "react";

const Restaurants = () => {
  const { selectedAddress, removeSelectedAddress } = useAddress();

  const { filters, removeFilters } = useRestaurantFilters();

  const { data, error, isError, isFetching, fetchNextPage } = useGetRestaurants(
    selectedAddress,
    filters
  );

  useEffect(() => {
    return () => removeFilters();
  }, []);

  // TODO: add error widget

  const invalidAddressProps = getInvalidAddressErrProps(
    removeSelectedAddress,
    error
  );

  return (
    <section className="all-restaurants">
      <Navbar pageNum={3} />
      <main className="flex flex-col items-center gap-3">
        <RestaurantsWidget />
        {isError ? (
          <ErrorWidget {...invalidAddressProps} />
        ) : (
          <>
            <FiltersDropdown />
            <RestaurantsList
              data={data}
              error={error}
              isFetching={isFetching}
              fetchNextPage={fetchNextPage}
            />
          </>
        )}
      </main>
    </section>
  );
};
export default Restaurants;
