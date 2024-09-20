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
