import RestaurantProfileForm from "@/components/custom/forms/RestaurantProfileForm";
import {
  defaultRestaurantValues,
  restaurantProfileSchema,
  RestaurantProfileType,
} from "@/lib/validations/RestaurantProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const RestaurantProfile = () => {
  const form = useForm<RestaurantProfileType>({
    resolver: zodResolver(restaurantProfileSchema),
    mode: "onSubmit",
    defaultValues: defaultRestaurantValues,
  });

  return (
    <section className="restaurant-profile__body">
      <h2 className="text-3xl font-semibold mb-5">Dettagli Ristorante</h2>
      <FormProvider {...form}>
        <RestaurantProfileForm />
      </FormProvider>
    </section>
  );
};
export default RestaurantProfile;
