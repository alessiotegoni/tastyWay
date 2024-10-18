import { cuisineTypes } from "@/constants";
import { FoodType } from "@/types/restaurantTypes";
import { z } from "zod";

const restaurantItem = z.object({
  img: z
    .custom<File>((data) => data, {
      message: "L'immagine del piatto e' obbligatoria",
    })
    .nullable(),
  name: z.string().min(3, "Il nome del piatto deve avere almeno 2 caratteri"),
  price: z
    .number({ message: "Prezzo del piatto obbligatorio" })
    .positive("Prezzo deve essere maggiore di 0"),
  type: z.string({ message: "Tipo del piatto obbligatorio" }).min(2),
  description: z
    .string()
    .min(3, "Descrizione del piatto obbligatoria")
    .max(200, "Massimo 200 parole"),
});

export type RestaurantItemType = z.infer<typeof restaurantItem>;

export const restaurantProfileSchema = z.object({
  name: z
    .string({ message: "Nome del ristorante obbligatorio" })
    .min(3, "Il nome del ristorante deve avere almeno 3 caratteri"),
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
  deliveryInfo: {
    price: 0.1,
    time: 10,
  },
  cuisine: [],
  items: [],
};

export type RestaurantProfileType = z.infer<typeof restaurantProfileSchema>;
