import Navbar from "@/components/shared/Navbar/Navbar";
import RestaurantsWidget from "@/components/widgets/RestaurantsWidget";
import { useAddress } from "@/contexts/AddressContext";
import { useRestaurantFilters } from "@/contexts/RestaurantFiltersContext";
import { useGetRestaurants } from "@/lib/react-query/queries";
import { useEffect } from "react";

const Restaurants = () => {
  const { selectedAddress } = useAddress();

  const { filters, removeFilters } = useRestaurantFilters();

  console.log(selectedAddress);

  const { data, error, isError, fetchNextPage } = useGetRestaurants(
    selectedAddress,
    filters
  );

  useEffect(() => {
    return () => removeFilters();
  }, []);
  console.log(data);

  return (
    <section className="all-restaurants">
      <Navbar pageNum={3} />
      <main className="flex flex-col items-center">
        <RestaurantsWidget />
      </main>
    </section>
  );
};
export default Restaurants;
