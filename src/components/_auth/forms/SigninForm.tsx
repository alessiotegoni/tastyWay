import { useFormContext, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { SigninType } from "@/lib/validations/authSchemas";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import {
  useForgotPassword,
  useSignin,
} from "@/lib/react-query/mutations/authMutations";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { showErrorToast } from "@/lib/utils";

const SigninForm = () => {
  const form = useFormContext<SigninType>();

  const { mutateAsync: signin, isSuccess, isPending } = useSignin();
  const { mutateAsync: forgotPassword, isPending: isSendingEmail } =
    useForgotPassword();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

  const canSend = !isSendingEmail && !isPending;

  const handleForgotPassword = async () => {
    if (!canSend) return;

    const email = form.getValues("email");
    try {
      if (!email) throw new Error("Inserisci prima la tua email");
      const res = await forgotPassword(email);

      toast({
        title: res.message,
      });
    } catch (err: any) {
      showErrorToast({
        err,
        description: "Errore nell'invio dell'email, riprovare",
      });
    }
  };

  const onSubmit: SubmitHandler<SigninType> = async (data) => {
    if (!canSend) return;

    try {
      await signin(data);

      toast({ title: "Accesso effetuato con successo" });
    } catch (err: any) {
      showErrorToast({ err });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col my-5 gap-[15px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email"
                    className="signin-form-input"
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
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Password"
                    className="signin-form-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <p className="font-medium text-[15px] mt-5 mb-5 flex gap-1">
          Password dimenticata?
          <Button
            type="button"
            onClick={handleForgotPassword}
            className="text-[#FCAE08] hover:underline"
            disabled={isSendingEmail}
          >
            Reimpostala
          </Button>
        </p>
        <Button
          type="submit"
          className="w-full py-4 sm:py-5 bg-[#C24C08]
        rounded-[20px] sm:rounded-[26px] text-lg sm:text-[24px] font-semibold"
        >
          {!canSend ? <Loader2 /> : "Accedi"}
        </Button>
      </form>
    </Form>
  );
};
export default SigninForm;
