import Navbar from "@/components/shared/Navbar/Navbar";
import { useGetRestaurant } from "@/lib/react-query/queries";
import { useParams } from "react-router-dom";

const Restaurant = () => {
  const { restaurantName } = useParams();

  const {
    data: restaurant,
    isLoading,
    isError,
    error,
  } = useGetRestaurant(restaurantName);

  console.log(restaurant);

  // TODO: restaurant ui

  return (
    <div className="hero">
      <Navbar pageNum={4} />
      <main className="restaurant">
        <img
          src="/imgs/restaurants-bg.png"
          alt="restaurants-bg-img"
          className="bg-img"
        />
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Restaurant;
