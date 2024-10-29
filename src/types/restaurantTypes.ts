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

export type OrderItem = {
  _id: string;
  img: string | undefined;
  price: number;
  name: string;
  quantity: number;
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
  address: string;
  status: OrderStatus;
  totalPrice: number;
  expectedTime: string;
};

export type RestaurantUserOrder = Omit<
  RestaurantActiveOrder,
  "customerSurname"
> & {
  items: OrderItem[];
  clientFullName: string;
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

export type ItemsFilter = {
  value: RestaurantItemsTypes;
  label: string;
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
  | "main_course"
  | "breakfast"
  | "smoothies"
  | "bakery"
  | "healthy"
  | "kebab";

export type RestaurantItemsFilters = {
  name: string | null;
  itemsType: RestaurantItemsTypes[] | null;
};

export type OrderStatus =
  | "In attesa"
  | "Accettato"
  | "In preparazione"
  | "In consegna"
  | "Consegnato";

export type RestaurantOrdersFilters = {
  statusTypes: OrderStatus[];
  orderInfo: string | null;
};

export type RestaurantOrdersRes = {
  orders: Omit<RestaurantUserOrder, "items"> & {
    items: Pick<OrderItem, "_id" | "name" | "quantity">[];
  };
  nextCursor: string | null;
};
