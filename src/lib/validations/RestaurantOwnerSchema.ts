import { z } from "zod";

export const restaurantOwnerSchema = z.object({
  name: z.string().min(3, "Nome invalido"),
  surname: z.string().min(3, "Cognome invalido"),
  phoneNumber: z
    .number()
    .refine((num) => /^3[1-9]\d{8}$/.test(num.toString()), "Numero non valido"),
});

export type RestaurasntOwnerType = z.infer<typeof restaurantOwnerSchema>;
