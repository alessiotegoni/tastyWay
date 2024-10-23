import { useFormContext, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { SignupType } from "@/lib/validations/authSchemas";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignup } from "@/lib/react-query/mutations/authMutations";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import LocationAutocomplete from "@/components/shared/autocomplete/LocationAutocomplete";

// TODO: Add otp phone verification

const SignupForm = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const form = useFormContext<SignupType>();

  const {
    mutateAsync: signup,
    isError,
    error,
    isSuccess,
    isPending,
  } = useSignup();

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const redirectPath = queryParams.get("redirect");

    if (isSuccess) navigate(redirectPath ?? "/");
  }, [navigate, isSuccess]);

  const onSubmit: SubmitHandler<SignupType> = async (data) => {
    if (isPending) return;

    await signup(data);
    toast({ title: "Registrazione effettuata con successo" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 my-5">
          <div className="gap-3 flex-between">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nome"
                      className="signup-form-input"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Cognome"
                      className="signup-form-input"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {(form.formState.errors?.name || form.formState.errors.surname) && (
            <div className="gap-3 flex-between">
              {form.formState.errors?.name && (
                <p className="text-sm font-medium">
                  {form.formState.errors.name.message}
                </p>
              )}
              {form.formState.errors?.surname && (
                <p className="text-sm font-medium">
                  {form.formState.errors.surname.message}
                </p>
              )}
            </div>
          )}
          <FormField
            control={form.control}
            name="address"
            render={() => (
              <FormItem className="relative w-full">
                <FormControl>
                  <LocationAutocomplete
                    shouldShowLatestResearchs={false}
                    placeholder="Indirizzo"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Numero di telefono"
                    className="signup-form-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* {(form.formState.errors?.address ||
            form.formState.errors?.phoneNumber) && (
            <div className="gap-3 flex-between">
              {form.formState.errors?.address && (
                <p className="text-sm font-medium">
                  {form.formState.errors.address.message}
                </p>
              )}
              {form.formState.errors?.phoneNumber && (
                <p className="text-sm font-medium">
                  {form.formState.errors.phoneNumber.message}
                </p>
              )}
            </div>
          )} */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email"
                    className="signup-form-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Password"
                    className="signup-form-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isError && (
            <div
              className="rounded-[17px] p-5 font-medium
            bg-x-icon-bg-40 border border-x-icon-bg-60"
            >
              {error.response?.data?.message ??
                "Errore nella richiesta, riprova piu tardi"}
            </div>
          )}
        </div>
        <p className="font-medium text-[15px] mt-[40px] mb-4">
          Se hai gia un account,{" "}
          <Link to="/signin" className="text-[#FCAE08] hover:underline">
            Accedi
          </Link>
        </p>
        <Button
          type="submit"
          className="w-full py-5 bg-[#C24C08]
        rounded-[26px] text-[24px] font-semibold"
        >
          Registrati
        </Button>
      </form>
    </Form>
  );
};
export default SignupForm;
