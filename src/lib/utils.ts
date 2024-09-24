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

export const getInvalidAddressErrProps = (
  removeSelectedAddress: () => void,
  error: ApiError | null
) => {
  return {
    error,
    className: "primary-widget-bg border border-primary-20 rounded-[30px]",
    subtitle:
      "Non siamo riusciti a trovare ristoranti nella tua zona perché non è stato inserito un indirizzo valido. Per scoprire i migliori ristoranti vicini a te, inserisci un indirizzo corretto nel campo di ricerca. Questo ci aiuterà a mostrarti le opzioni più adatte e vicine.",
    btns: [
      {
        value: "Cambia posizione",
        icon: "cursor-icon",
        className: "use-location-btn my-0",
        handleClick: () => removeSelectedAddress(),
      },
    ],
  };
};
