import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z
    .string({ message: "La password deve essere una stringa" })
    .min(8, "La password deve avere almeno 8 caratteri"),
});

export const defaultSigninValues = {
  email: "",
  password: "",
};

export type SigninType = z.infer<typeof signinSchema>;

export const signupSchema = signinSchema.extend({
  name: z
    .string({ message: "Il nome deve essere una stringa" })
    .min(3, "Il nome deve avere almeno 3 caratteri"),
  surname: z
    .string({ message: "Il cognome deve essere una stringa" })
    .min(3, "Il cognome deve avere almeno 3 caratteri"),
  address: z
    .string({ message: "L'indirizzo e' obbligatorio" })
    .min(3, "Indirizzo non valido"),
  phoneNumber: z
    .number({ message: "Numero invalido" })
    .refine(
      (num) => /^3[1-9]\d{8}$/.test(num.toString()),
      "Il numero deve essere italiano"
    ),
});

export const defaultSignupValues = {
  ...defaultSigninValues,
  name: "",
  surname: "",
  address: "",
  phoneNumber: undefined,
};

export type SignupType = z.infer<typeof signupSchema>;

// export type setAddressType = (
//   name: keyof SignupType | `address.${keyof SignupType["address"]}`,
//   value: string
// ) => void;

// export interface setAddressType {
//   (
//     name: keyof SignupType | `address.${keyof SignupType["address"]}`,
//     value: string
//   ): void;
// };
