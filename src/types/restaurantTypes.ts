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
  price: number;
  img: string;
  description: string;
};

export type RestaurantType = {
  createdAt: string;
  items: RestaurantItem[];
} & Omit<RestaurantsType, "cuisine">;

// export enum FoodType {
//   PIZZA = "pizza",
//   SUSHI = "sushi",
//   BURGER = "burger",
//   DESSERT = "dessert",
//   ITALIAN = "italian",
//   AMERICAN = "american",
//   CHINESE = "chinese",
//   MEXICAN = "mexican",
//   INDIAN = "indian",
//   THAI = "thai",
//   MEDITERRANEAN = "mediterranean",
//   VEGETARIAN = "vegetarian",
//   VEGAN = "vegan",
//   FAST_FOOD = "fast_food",
//   SEAFOOD = "seafood",
//   BBQ = "bbq",
//   HEALTHY = "healthy",
//   STEAKHOUSE = "steakhouse",
//   BREAKFAST = "breakfast",
//   BAKERY = "bakery",
// }

// export enum RestaurantType {
//   CHEAP = "cheap",
//   EXPENSIVE = "expensive",
//   TOP_RATED = "top_rated",
//   FAST_DELIVERY = "fast_delivery",
//   NEW = "new",
//   TRENDING = "trending",
// }

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

export type FoodFilters = {
  img: string;
  name: string;
  value: FoodType;
};

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
