export type RestaurantsType = {
  _id: string;
  address: string;
  name: string;
  imageUrl: string;
  cuisine: string[];
  deliveryInfo: {
    price: number;
    time: number;
  };
};

export type RestaurantsRes = {
  nextCursor: string | null;
  restaurants: RestaurantsType[];
};

export type RestaurantItem = {
  _id: string;
  name: string;
  type: string;
  price: number;
  img: string;
  description: string;
};

export type RestaurantRes = {
  createdAt: string;
} & Omit<RestaurantsType, "cuisine">;

export type RestaurantItemRes = {
  nextCursor: string | null;
  restaurantItems: RestaurantItem[];
};

export type RestaurantActiveOrder = {
  orderId: string;
  customerSurname: string;
  street: string;
  status: string;
  totalPrice: number;
  expectedTime: Date;
};

export type FoodFilters = {
  img: string;
  name: string;
  value: FoodType;
};

export type FoodType =
  | "pizza"
  | "sushi"
  | "burger"
  | "dessert"
  | "italian"
  | "american"
  | "chinese"
  | "mexican"
  | "indian"
  | "thai"
  | "mediterranean"
  | "vegetarian"
  | "vegan"
  | "fast_food"
  | "seafood"
  | "bbq"
  | "healthy"
  | "steakhouse"
  | "breakfast"
  | "bakery";

export type RestaurantTypeFilter =
  | "cheap"
  | "expensive"
  | "top_rated"
  | "fast_delivery"
  | "new"
  | "trending";

export type RestaurantFilters = {
  name: string | null;
  foodType: FoodType[] | null;
  restaurantType: RestaurantTypeFilter[] | null;
};

export type RestaurantItemsTypes =
  | "pizza"
  | "burger"
  | "pasta"
  | "salad"
  | "sandwich"
  | "flatbread"
  | "fried_food"
  | "sushi"
  | "appetizers"
  | "desserts"
  | "drinks"
  | "bbq"
  | "seafood"
  | "meat"
  | "soup"
  | "vegan"
  | "vegetarian"
  | "gluten_free"
  | "fruit"
  | "tapas"
  | "sandwiches"
  | "rice"
  | "poke"
  | "main_course";

export type RestaurantItemsFilters = {
  name: string | null;
  itemsType: RestaurantItemsTypes[] | null;
};
