import {
  RestaurantItemsTypes,
} from "@/types/restaurantTypes";

// type RestaurantFiltersType = {
//   value: RestaurantTypeFilter;
//   label: string;
// };

export const restaurantsFilters = [
  {
    value: "cheap",
    label: "Economico",
  },
  {
    value: "expensive",
    label: "Costoso",
  },
  {
    value: "top_rated",
    label: "Migliori recensioni",
  },
  {
    value: "fast_delivery",
    label: "Consegna rapida",
  },
  {
    value: "new",
    label: "Nuovo",
  },
  {
    value: "trending",
    label: "Di tendenza",
  },
];

export const restaurantItemFilters: {
  value: RestaurantItemsTypes;
  label: string;
}[] = [
  { value: "pizza", label: "Pizza" },
  { value: "burger", label: "Hamburger" },
  { value: "pasta", label: "Pasta" },
  { value: "salad", label: "Insalata" },
  { value: "sandwich", label: "Panino" },
  { value: "flatbread", label: "Focaccia" },
  { value: "fried_food", label: "Cibo Fritto" },
  { value: "sushi", label: "Sushi" },
  { value: "appetizers", label: "Antipasti" },
  { value: "desserts", label: "Dolci" },
  { value: "drinks", label: "Bevande" },
  { value: "bbq", label: "BBQ" },
  { value: "seafood", label: "Frutti di Mare" },
  { value: "meat", label: "Carne" },
  { value: "soup", label: "Zuppa" },
  { value: "vegan", label: "Vegano" },
  { value: "vegetarian", label: "Vegetariano" },
  { value: "gluten_free", label: "Senza Glutine" },
  { value: "fruit", label: "Frutta" },
  { value: "tapas", label: "Tapas" },
  { value: "sandwiches", label: "Panini" },
  { value: "rice", label: "Riso" },
  { value: "poke", label: "Poke" },
  { value: "main_course", label: "Portata Principale" },
];
