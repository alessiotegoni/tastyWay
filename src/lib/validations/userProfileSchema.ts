import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(3, "Nome invalido"),
  surname: z.string().min(3, "Cognome invalido"),
  phoneNumber: z
    .number()
    .refine((num) => /^3[1-9]\d{8}$/.test(num.toString()), "Numero non valido"),
  address: z.string({ message: "Indirizzo non valido" }),
  isCompanyAccount: z.boolean({ message: "Account aziendale invalido" }),
});

export type UserProfileType = z.infer<typeof userProfileSchema>;

export const userSecuritySchema = z.object({
  oldPassword: z
    .string()
    .min(5, "La vecchia password deve avere almeno 5 caratteri"),
  newPassword: z
    .string()
    .min(5, "La nuova password deve avere almeno 5 caratteri"),
});

export type UserSecurityType = z.infer<typeof userSecuritySchema>;
