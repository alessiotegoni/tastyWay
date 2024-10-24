import ClientFormBtns from "@/components/shared/ClientFormBtns";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useUpdateUserProfile } from "@/lib/react-query/mutations/userMutations";
import { useGetUserProfile } from "@/lib/react-query/queries/userQueries";
import {
  restaurantOwnerSchema,
  RestaurasntOwnerType,
} from "@/lib/validations/RestaurantOwnerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const RestaurantOwner = () => {
  const { user } = useAuth();

  const form = useForm<RestaurasntOwnerType>({
    resolver: zodResolver(restaurantOwnerSchema),
    mode: "onSubmit",
  });

  const { data: userProfile, isLoading: isLoadingUP } = useGetUserProfile();

  const {
    mutateAsync: updateUserProfile,
    isPending: isUpdatingUP,
    error,
  } = useUpdateUserProfile();

  useEffect(() => {
    if (userProfile) form.reset(userProfile, { keepDirty: false });
  }, [userProfile]);

  const onSubmit: SubmitHandler<RestaurasntOwnerType> = async (data) => {
    if (isUpdatingUP && isLoadingUP) return;

    try {
      const res = await updateUserProfile({
        ...data,
        isCompanyAccount: true,
        address: userProfile!.address,
      });

      toast({ description: res.message });
    } catch (err) {
      toast({
        description:
          error!.response?.data?.message ??
          "Errore nell'aggiornamento dell'utente",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="restaurant-owner__body">
      <h2 className="text-2xl font-semibold">Dettagli titolare</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex-center gap-2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" {...field} />
                </div>
              )}
            />
            <FormField
              name="surname"
              control={form.control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="surname">Cognome</Label>
                  <Input id="surname" {...field} />
                </div>
              )}
            />
          </div>
          <FormMessage className="mt-4 mb-2">
            {form.formState.errors.name?.message}
          </FormMessage>
          <FormMessage>{form.formState.errors.surname?.message}</FormMessage>
          <div>
            <Label htmlFor="email">Cognome</Label>
            <Input id="email" value={user!.email} disabled />
          </div>
          <div className="flex-center gap-2">
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="name">Telefono</Label>
                  <Input
                    id="name"
                    type="number"
                    {...field}
                    className="appearance-none"
                  />
                </div>
              )}
            />
            <div>
              <Label htmlFor="country">Paese</Label>
              <Input id="country" value="Italia" disabled />
            </div>
          </div>
          <ClientFormBtns
            form={form}
            defaultValues={userProfile}
            isLoading={isLoadingUP}
          />
        </form>
      </Form>
    </section>
  );
};
export default RestaurantOwner;
