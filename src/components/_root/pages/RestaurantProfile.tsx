import RestaurantProfileForm from "@/components/custom/forms/RestaurantProfileForm";
import ErrorWidget from "@/components/widgets/ErrorWidget";
import useAddress from "@/hooks/useAddress";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useGetMyRestaurant } from "@/lib/react-query/queries/restaurantQueries";
import {
  defaultRestaurantValues,
  restaurantProfileSchema,
  RestaurantProfileType,
} from "@/lib/validations/RestaurantProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const RestaurantProfile = () => {
  const { selectedAddress } = useAddress();
  const { data, isLoading, error, isError, refetch } = useGetMyRestaurant();
  const { user } = useAuth();

  const form = useForm<RestaurantProfileType>({
    resolver: zodResolver(restaurantProfileSchema),
    mode: "onSubmit",
    defaultValues: data ?? {
      ...defaultRestaurantValues,
      address: selectedAddress ?? "",
    },
  });

  useEffect(() => {
    if (data) form.reset(data, { keepDirty: false });
  }, [data]);

  useEffect(() => {
    if (!user!.restaurantName)
      toast({
        description: `Il tuo ristorante sara' visibile agli
        utenti solo quando completerai tutti i campi
        e aggiungerai almeno 3 piatti`,
      });
  }, []);

  return data ? (
    <section className="restaurant-profile__body min-h-[500px]">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-5">
        Dettagli Ristorante
      </h2>

      {isLoading ? (
        <div className="flex-center mt-2 h-full">
          <Loader2 size={50} />
        </div>
      ) : (
        <FormProvider {...form}>
          <RestaurantProfileForm restaurantName={data?.name} />
        </FormProvider>
      )}
    </section>
  ) : !isLoading ? (
    <ErrorWidget
      className="restaurant-widget mx-auto max-w-[650px]"
      title="Ops! Qualcosa è andato storto..."
      subtitle="Sembra che ci sia stato un problema nel caricamento delle informazioni del ristorante. Stiamo lavorando per risolvere questo inconveniente il prima possibile."
      error={error}
      btns={[
        {
          id: "refetchInfo",
          value: "Aggiorna informazioni",
          className: "sm:mt-14 btn bg-[#2A003E] border-transparent",
          handleClick: () => refetch(),
        },
      ]}
    />
  ) : (
    <section className="restaurant-profile__body min-h-[500px]">
      <div className="flex-center mt-2 h-full">
        <Loader2 size={50} />
      </div>
    </section>
  );
};
export default RestaurantProfile;
