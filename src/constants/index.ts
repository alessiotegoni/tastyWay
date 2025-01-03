import { FoodFilters, OrderStatus } from "@/types/restaurantTypes";

export const tastyWayLogo = "/imgs/tastyWay-logo.png";

export const foodFilters: FoodFilters[] = [
  {
    img: "/icons/food-filters/pizza.png",
    name: "Pizza",
    value: "pizza",
  },
  {
    img: "/icons/food-filters/sushi.png",
    name: "Sushi",
    value: "sushi",
  },
  {
    img: "/icons/food-filters/dessert.png",
    name: "Dessert",
    value: "dessert",
  },
  {
    img: "/icons/food-filters/healthy.png",
    name: "Salutare",
    value: "healthy",
  },
  {
    img: "/icons/food-filters/fast-food.png",
    name: "Fast food",
    value: "fast_food",
  },
  {
    img: "/icons/food-filters/italian.png",
    name: "Italiana",
    value: "italian",
  },
  {
    img: "/icons/food-filters/american.png",
    name: "Americana",
    value: "american",
  },
  {
    img: "/icons/food-filters/chinese.png",
    name: "Cinese",
    value: "chinese",
  },
  {
    img: "/icons/food-filters/mexican.webp",
    name: "Messicana",
    value: "mexican",
  },
  {
    img: "/icons/food-filters/indian.png",
    name: "Indiana",
    value: "indian",
  },
  {
    img: "/icons/food-filters/thai.png",
    name: "Thailandese",
    value: "thai",
  },
  {
    img: "/icons/food-filters/mediterranean.png",
    name: "Mediterranea",
    value: "mediterranean",
  },
  {
    img: "/icons/food-filters/vegetarian.webp",
    name: "Vegetariana",
    value: "vegetarian",
  },
  {
    img: "/icons/food-filters/vegan.png",
    name: "Vegana",
    value: "vegan",
  },
  {
    img: "/icons/food-filters/seafood.webp",
    name: "Pesce",
    value: "seafood",
  },
  {
    img: "/icons/food-filters/bbq.png",
    name: "BBQ",
    value: "bbq",
  },
  {
    img: "/icons/food-filters/steakhouse.png",
    name: "Steakhouse",
    value: "steakhouse",
  },
  {
    img: "/icons/food-filters/breakfast.png",
    name: "Colazione",
    value: "breakfast",
  },
  {
    img: "/icons/food-filters/bakery.png",
    name: "Panetteria",
    value: "bakery",
  },
];

export const cuisineTypes = foodFilters.map((ft) => ft.value);

export const itemsTypes = [
  { value: "pizza", label: "Pizza" },
  { value: "burger", label: "Hamburger" },
  { value: "pasta", label: "Pasta" },
  { value: "salad", label: "Insalata" },
  { value: "sandwich", label: "Panino" },
  { value: "flatbread", label: "Focaccia" },
  { value: "fried_food", label: "Cibo fritto" },
  { value: "sushi", label: "Sushi" },
  { value: "appetizers", label: "Antipasti" },
  { value: "desserts", label: "Dolci" },
  { value: "drinks", label: "Bevande" },
  { value: "bbq", label: "Barbecue" },
  { value: "seafood", label: "Frutti di mare" },
  { value: "meat", label: "Carne" },
  { value: "soup", label: "Zuppa" },
  { value: "vegan", label: "Vegano" },
  { value: "vegetarian", label: "Vegetariano" },
  { value: "gluten_free", label: "Senza glutine" },
  { value: "fruit", label: "Frutta" },
  { value: "tapas", label: "Tapas" },
  { value: "sandwiches", label: "Panini" },
  { value: "rice", label: "Riso" },
  { value: "poke", label: "Poke" },
  { value: "main_course", label: "Portata principale" },
  { value: "breakfast", label: "Colazione" },
  { value: "smoothies", label: "Frullati" },
  { value: "bakery", label: "Panetteria/Pasticceria" },
  { value: "healthy", label: "Salute" },
  { value: "kebab", label: "Kebab/Grigliati" },
];

export const orderStatuses: OrderStatus[] = [
  "In attesa",
  "Accettato",
  "In preparazione",
  "In consegna",
  "Consegnato",
];

export const userDropdownLinks = [
  {
    img: "/icons/user-profile-icon.png",
    name: "Il mio profilo",
    link: "/user",
    alt: "profile-settings-icon",
  },
  {
    img: "/icons/orders-icon.png",
    name: "I miei ordini",
    link: "/user/orders",
    alt: "orders-icon",
  },
  {
    img: "/icons/help-icon.png",
    name: "Aiuto e supporto",
    link: "/help",
    alt: "help-support-icon",
  },
];

export const restaurantDropdownLinks = [
  {
    img: "/icons/restaurant-profile-icon.png",
    name: "Il mio ristorante",
    link: "/my-restaurant",
    alt: "profile-settings-icon",
  },
  {
    img: "/icons/orders-icon.png",
    name: "Ordini",
    link: "/my-restaurant/orders",
    alt: "orders-icon",
  },
  {
    img: "/icons/help-icon.png",
    name: "Aiuto e supporto",
    link: "/help",
    alt: "help-support-icon",
  },
];

export const faqs = [
  {
    question: "Come posso tracciare il mio ordine?",
    answer:
      'Puoi tracciare il tuo ordine accedendo alla sezione "I miei ordini" nel tuo account. Lì troverai informazioni in tempo reale sullo stato della tua consegna.',
  },
  {
    question: "Quali sono i metodi di pagamento accettati?",
    answer:
      "Accettiamo pagamenti con carte di credito/debito, PayPal e, in alcune zone, il pagamento in contanti alla consegna.",
  },
  {
    question: "Come posso modificare o annullare un ordine?",
    answer:
      "Puoi modificare o annullare un ordine entro 5 minuti dall'invio. Dopo questo periodo, contatta il nostro servizio clienti per assistenza.",
  },
  {
    question: "Qual è il tempo medio di consegna?",
    answer:
      "Il tempo medio di consegna è di 30-45 minuti, ma può variare in base alla distanza e al traffico.",
  },
  {
    question: "Come posso segnalare un problema con il mio ordine?",
    answer:
      'Puoi segnalare un problema con il tuo ordine attraverso la sezione "Aiuto" nell\'app o contattando direttamente il nostro servizio clienti.',
  },
];
