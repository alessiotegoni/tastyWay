import LocationAutocomplete from "@/components/shared/autocomplete/LocationAutocomplete";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useUpdateUserProfile } from "@/lib/react-query/mutations/userMutations";
import { useGetUserProfile } from "@/lib/react-query/queries/userQueries";
import { UserProfileType } from "@/lib/validations/userProfileSchema";
import { useEffect } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import ClientFormBtns from "../../shared/ClientFormBtns";
import { useCreateMyRestaurant } from "@/lib/react-query/mutations/restaurantMutations";

const UserProfileForm = () => {
  const { user, refreshToken } = useAuth();

  const form = useFormContext<UserProfileType>();

  const { data: userProfile, isLoading: isLoadingUP } = useGetUserProfile();

  useEffect(() => {
    if (userProfile) form.reset(userProfile);
  }, [userProfile]);

  const { mutateAsync: updateUserProfile, isPending: isUpdatingUP } =
    useUpdateUserProfile();
  const {
    mutateAsync: createRestaurant,
    isPending: isCreatingRestaurant,
    isError: isCreateError,
  } = useCreateMyRestaurant();

  useEffect(() => {
    if (isCreateError) location.reload();
  }, [isCreateError]);

  // isDirty = Se il form o il campo e' stato modificato (diverso da quello di prima)

  const onSubmit: SubmitHandler<UserProfileType> = async (data) => {
    if (isUpdatingUP || isLoadingUP || isCreatingRestaurant) return;

    try {
      await updateUserProfile(data);
      if (data.isCompanyAccount) await createRestaurant();

      await refreshToken();

      toast({
        description: data.isCompanyAccount
          ? "Passaggio ad account aziendale eseguito"
          : "Profilo aggiornato con successo",
      });
    } catch (err: any) {
      toast({
        description:
          err.response?.data?.message ??
          "Errore nell'aggiornamento dell'utente",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="xs:flex gap-2">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <div className="basis-1/2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" {...field} />
              </div>
            )}
          />
          <FormField
            name="surname"
            control={form.control}
            render={({ field }) => (
              <div className="basis-1/2">
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
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue={user!.email} disabled />
        </div>
        <div className="xs:flex gap-2">
          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <div className="basis-1/2">
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
          <div className="basis-1/2">
            <Label htmlFor="country">Paese</Label>
            <Input id="country" value="Italia" disabled />
          </div>
        </div>
        <FormField
          name="address"
          control={form.control}
          render={() => (
            <div>
              <Label htmlFor="address">Indirizzo</Label>
              <LocationAutocomplete
                placeholder="Il tuo indirizzo"
                shouldShowLatestResearchs={false}
              />
            </div>
          )}
        />
        <FormField
          name="isCompanyAccount"
          control={form.control}
          render={({ field: { value, onChange, name } }) => (
            <div className="mt-8">
              <Label htmlFor="cmpAccount" className="flex-between">
                <h3 className="text-sm sm:text-lg">
                  Passa ad account aziendale
                </h3>
                <div
                  className={`relative w-[67px] h-[32px] rounded-xl transition-colors
                ${
                  value
                    ? "bg-restaurant-primary-80 border border-restaurant-primary"
                    : "bg-[#ED0000] bg-opacity-50 border-[#FF0000] border-opacity-60"
                }`}
                >
                  <div
                    className={`absolute bg-[#D9D9D9] rounded-full w-5 h-5
                  top-1/2 -translate-y-1/2 ${
                    value ? "left-[40px]" : "left-[6px]"
                  } transition-all`}
                  ></div>
                </div>
              </Label>
              <Input
                id="cmpAccount"
                name={name}
                type="checkbox"
                checked={value}
                onChange={onChange}
                className="hidden"
              />
            </div>
          )}
        />
        <ClientFormBtns
          form={form}
          defaultValues={userProfile}
          isLoading={isUpdatingUP || isLoadingUP || isCreatingRestaurant}
        />
      </form>
    </Form>
  );
};
export default UserProfileForm;
