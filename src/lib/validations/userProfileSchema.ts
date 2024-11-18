import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  surname: z.string().min(2, "Il cognome deve avere almeno 2 caratteri"),
  phoneNumber: z
    .number({ message: "Numero invalido" })
    .refine(
      (num) => /^3[1-9]\d{8}$/.test(num.toString()),
      "Il numero deve essere italiano"
    ),
  address: z.string().min(1, "Indirizzo non valido"),
  isCompanyAccount: z.boolean({ message: "Account aziendale invalido" }),
});

export type UserProfileType = z.infer<typeof userProfileSchema>;

export const defaultUserValues = {
  name: "",
  surname: "",
  phoneNumber: 0,
  address: "",
  isCompanyAccount: false,
};
