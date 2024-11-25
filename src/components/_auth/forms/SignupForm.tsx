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
import { Link, useNavigate } from "react-router-dom";
import {
  useSendVerificationEmail,
  useSignup,
} from "@/lib/react-query/mutations/authMutations";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import LocationAutocomplete from "@/components/shared/autocomplete/LocationAutocomplete";
import InputMask from "react-input-mask";
import { Loader2 } from "lucide-react";
import { showErrorToast } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const SignupForm = () => {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const form = useFormContext<SignupType>();

  const { mutateAsync: signup, isPending } = useSignup();
  const { mutateAsync: sendEmail, isPending: isSending } =
    useSendVerificationEmail();

  useEffect(() => {
    const handleSendEmail = async () => {
      try {
        const res = await sendEmail();
        navigate("/verify-email");
        toast({ description: res.message });
      } catch (err) {
        showErrorToast({
          err,
          description: "Errore nell'invio della email di verifica",
        });
      }
    };

    if (isAuthenticated) handleSendEmail();
  }, [isAuthenticated]);

  const onSubmit: SubmitHandler<SignupType> = async (data) => {
    if (isPending || isSending) return;

    try {
      await signup(data);
      toast({ description: "Registrazione effettuata con successo" });
    } catch (err: any) {
      showErrorToast({ err });
    }
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
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormControl>
                  <InputMask
                    id="phoneNumber"
                    mask="999 999 9999"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        parseInt(e.target.value.replace(/\s/g, ""))
                      )
                    }
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        className="signup-form-input"
                        placeholder="Numero di telefono"
                      />
                    )}
                  </InputMask>
                </FormControl>
                <FormMessage className="mt-1" />
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
        </div>
        <p className="font-medium text-[15px] mt-[40px] mb-4">
          Se hai gia un account,{" "}
          <Link to="/signin" className="text-[#FCAE08] hover:underline">
            Accedi
          </Link>
        </p>
        <Button
          type="submit"
          className="w-full py-4 sm:py-5 bg-[#C24C08]
        rounded-[20px] sm:rounded-[26px] text-lg sm:text-[24px] font-semibold"
        >
          {isPending || isSending ? <Loader2 /> : "Registrati"}
        </Button>
      </form>
    </Form>
  );
};
export default SignupForm;
