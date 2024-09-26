import { btn, ErrorWidgetProps } from "@/components/widgets/ErrorWidget";
import { ApiError } from "@/types/apiTypes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const filterSearchedLocations = (slArr: string[], userInput: string) => {
  const filteredSl = userInput
    ? slArr.filter((sl) =>
        sl
          .toLowerCase()
          .split(",")
          ?.at(0)!
          .includes(userInput.toLowerCase().split(",")?.at(0)!)
      )
    : [];

  return filteredSl;
};

export const getCityFromAddress = (address: string) => {
  let city = address.split(",").at(1)!;

  if (parseInt(city)) city = address.split(",").at(2)!;

  if (!city) return "nella tua citta'";

  return `a ${city}`;
};

export const formatRestaurantName = (name: string) =>
  name.toLowerCase().replace(" ", "-");

export const getInvalidAddressProps = (
  removeSelectedAddress: () => void,
  error?: ApiError | null
): ErrorWidgetProps => ({
  error,
  className: "primary-widget-bg border border-primary-20 rounded-[30px]",
  subtitle:
    "Non siamo riusciti a trovare ristoranti nella tua zona perché non è stato inserito un indirizzo valido. Per scoprire i migliori ristoranti vicini a te, inserisci un indirizzo corretto nel campo di ricerca. Questo ci aiuterà a mostrarti le opzioni più adatte e vicine.",
  btns: [
    {
      id: "change_location",
      value: "Cambia posizione",
      icon: "cursor-icon",
      className: "use-location-btn my-0",
      goto: "/",
      handleClick: () => removeSelectedAddress(),
    },
  ],
});

export const getNoRestaurantsProps = (
  removeFilters: () => void,
  removeSelectedAddress: () => void
): ErrorWidgetProps => ({
  title: "Oops! Non abbiamo trovato il ristorante che stai cercando.",
  className: "primary-widget-bg border border-primary-20 rounded-[30px]",
  subtitle:
    "Ma non preoccuparti! Prova a controllare la tua ricerca per eventuali errori di ortografia, oppure esplora ristoranti simili che potrebbero piacerti. Continuare la tua esplorazione?",
  btns: [
    {
      id: "reset_filters",
      value: "Resetta filtri",
      icon: "reset-filters-icon",
      className:
        "bg-home-widget-border-30 border border-primary-80 my-0 hover:bg-home-widget-border-80",
      handleClick: () => removeFilters(),
    },
    {
      id: "change_position",
      value: "Cambia posizione",
      icon: "cursor-icon",
      className: "use-location-btn my-0 border-location-btn-border-70",
      goto: "/",
      handleClick: () => removeSelectedAddress(),
    },
  ],
});
