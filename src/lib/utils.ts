import { toast, Toast } from "@/hooks/use-toast";
import { ApiError } from "@/types/apiTypes";
import { OrderStatus } from "@/types/userTypes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getCityFromAddress = (address: string) => {
  let city = address?.split(",").at(1)!;

  if (parseInt(city)) city = address.split(",").at(2)!;

  if (!city) return "nella tua citta'";

  return `a ${city}`;
};

export const formatRestaurantName = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "-");

export const getOrderStatusMsg = (orderStatus: OrderStatus): string => {
  let msg = "";

  switch (orderStatus) {
    case "In attesa":
      msg = "Aspettando la conferma del ristorante";
      break;
    case "Accettato":
      msg = "Il ristorante ha accettato il tuo ordine";
      break;
    case "In preparazione":
      msg = "il tuo ordine è in preparazione";
      break;
    case "In consegna":
      msg = "Il corriere sta arrivando!";
      break;
    case "Consegnato":
      msg = "Consegnato";
      break;
    default:
      console.error("Stato dell'ordine non valido");
  }

  return msg;
};

export const getExpectedTime = (isoDate: string) => {
  const date = new Date(isoDate);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isToday) return "Oggi";
  if (isYesterday) return "Ieri";

  const formattedDate = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

  return formattedDate;
};

export const getOrderSatusStyle = (orderStatus: OrderStatus) => {
  let style = "";

  switch (orderStatus) {
    case "In attesa":
      style += `bg-[#772F07] border-[#FF7121] border-opacity-70
      text-[#FF7121]`;
      break;
    case "Accettato":
      style += `bg-[#007120] bg-opacity-80 border-[#43FF3F] border-opacity-50
      text-[#43FF3F] text-opacity-80`;
      break;
    case "In preparazione":
      style += `bg-[#A00000] bg-opacity-70 border-[#ED0000] border-opacity-60
      text-[#FF7777] text-opacity-90`;
      break;
    case "In consegna":
      style += `bg-[#8B8600] bg-opacity-70 border-[#FCFF58] border-opacity-50
      text-[#FCFF58]`;
      break;
    case "Consegnato":
      style += `bg-[#7E004C] bg-opacity-80 border-[#FB38FF] border-opacity-50
      text-[#FB38FF]`;
      break;
  }

  return style;
};

export const getOrderStatusIcon = (orderStatus: OrderStatus) =>
  `/icons/${orderStatus.toLowerCase().replaceAll(" ", "-")}-icon.png`;

export const errorToast = ({
  description = "Errore nella richiesta, riprova più tardi",
  err,
  duration = 5_000,
  ...restProps
}: Toast & { err?: ApiError | Error }) => {
  const isApiError = (error: ApiError | Error): error is ApiError =>
    !!(error as ApiError)?.response?.data?.message;

  const errorMessage =
    err && isApiError(err) ? err.response?.data?.message : description;

  return toast({
    title: "Errore",
    description: errorMessage,
    variant: "destructive",
    duration,
    className: "error-toast",
    ...restProps,
  });
};
