import { cuisineTypes, itemsTypes } from "@/constants";
import { FoodType, RestaurantItemsTypes } from "@/types/restaurantTypes";
import { z } from "zod";

const restaurantItem = z.object({
  _id: z
    .string({ message: "Id non valido" })
    .length(24, "Id non valido")
    .optional(),
  img: z.custom<File | null>((data) => data, {
    message: "L'immagine del piatto e' obbligatoria",
  }),
  name: z.string().min(3, "Il nome del piatto deve avere almeno 2 caratteri"),
  price: z
    .number({ message: "Prezzo del piatto obbligatorio" })
    .positive("Prezzo deve essere maggiore di 0"),
  type: z
    .custom<RestaurantItemsTypes | null>((data) => data, {
      message: "Tipo del piatto obbligatorio",
    })
    .refine(
      (itemType) => itemsTypes.map((it) => it.value).includes(itemType ?? ""),
      {
        message: "Tipo di piatto non valido",
      }
    ),
  description: z
    .string()
    .min(3, "Descrizione del piatto obbligatoria")
    .max(200, "Massimo 200 parole"),
});

export type RestaurantItemType = z.infer<typeof restaurantItem>;

export const restaurantProfileSchema = z.object({
  name: z
    .string({ message: "Nome del ristorante obbligatorio" })
    .min(4, "Il nome del ristorante deve avere almeno 4 caratteri"),
  address: z
    .string({ message: "Indirizzo obbligatorio" })
    .min(3, "Indirizzo non valido"),
  deliveryInfo: z.object({
    price: z
      .number({ message: "Prezzo di consegna obbligatorio" })
      .positive("Prezzo deve essere maggiore di 0"),
    time: z
      .number({ message: "Tempo di consegna obbligatorio" })
      .min(10, "Il tempo di consegna minimo è di 10 minuti"),
  }),
  cuisine: z
    .array(z.custom<FoodType>(), {
      message: "Il tipo di cucina è obbligatorio",
    })
    .min(1, "E' obbligatorio almeno un tipo di cucina")
    .refine(
      (foodTypes) => foodTypes.filter((ft) => cuisineTypes.includes(ft)).length,
      { message: "Tipo di cucina invalido" }
    )
    .transform((foodTypes) =>
      foodTypes.filter((ft) => cuisineTypes.includes(ft))
    ),
  items: z
    .array(restaurantItem)
    .min(3, "Il numero minimo di piatti da aggiungere è 3"),
});

export const defaultRestaurantValues = {
  name: "",
  address: "",
  imageUrl: "",
  deliveryInfo: {
    price: 0,
    time: 0,
  },
  cuisine: [],
  items: [],
};

export type RestaurantProfileType = z.infer<typeof restaurantProfileSchema>;
