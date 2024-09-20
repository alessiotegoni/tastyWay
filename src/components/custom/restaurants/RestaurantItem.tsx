import { RestaurantsType } from "@/types/restaurantTypes"

interface RestaurantItemProps {
  restaurant: RestaurantsType
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  console.log(restaurant);


  return (
    <div>RestaurantItem</div>
  )
}
export default RestaurantItem
