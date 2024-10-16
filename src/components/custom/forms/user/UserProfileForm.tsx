import LocationAutocomplete from "@/components/shared/autocomplete/LocationAutocomplete";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfileType } from "@/lib/validations/userProfileSchema";
import { SubmitHandler, useFormContext } from "react-hook-form";

const UserProfileForm = () => {
  const { user } = useAuth();

  const form = useFormContext<UserProfileType>();

  const onSubmit: SubmitHandler<UserProfileType> = (data) => {
    console.log(data);
  };

  console.log(form.formState.errors);

  return (
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
                <Input id="name" type="number" {...field} />
              </div>
            )}
          />
          <div>
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
            <div>
              <Label htmlFor="cmpAccount" className="flex-between">
                <h3 className="text-lg">Passa ad account aziendale</h3>
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
        <div className="flex justify-end items-center gap-2 mt-7">
          <Button
            type="button"
            className="btn py-3 px-5 font-semibold rounded-xl bg-red-700
          text-red-950 border-red-800"
          >
            Annulla modifiche
          </Button>
          <Button
            type="submit"
            className="btn py-3 px-5 font-semibold rounded-xl bg-green-700
          text-green-950 border-green-800"
          >
            Salva modifiche
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UserProfileForm;
