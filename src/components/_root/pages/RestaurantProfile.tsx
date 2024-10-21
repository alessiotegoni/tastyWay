import RestaurantProfileForm from "@/components/custom/forms/RestaurantProfileForm";
import { useGetMyRestaurant } from "@/lib/react-query/queries";
import {
  defaultRestaurantValues,
  restaurantProfileSchema,
  RestaurantProfileType,
} from "@/lib/validations/RestaurantProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const RestaurantProfile = () => {
  const { data, isLoading, error, isError } = useGetMyRestaurant();

  const form = useForm<RestaurantProfileType>({
    resolver: zodResolver(restaurantProfileSchema),
    mode: "onSubmit",
    defaultValues: data ?? defaultRestaurantValues,
  });

  useEffect(() => {
    if (data) form.reset(data, { keepDirty: false });
  }, [data]);

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
