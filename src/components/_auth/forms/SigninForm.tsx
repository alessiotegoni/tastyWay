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
import { Link, useNavigate } from "react-router-dom";
import { useSignin } from "@/lib/react-query/mutations";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const SigninForm = () => {
  const form = useFormContext<SigninType>();

  const {
    mutateAsync: signin,
    isError,
    error,
    isSuccess,
    isPending,
  } = useSignin();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

  const onSubmit: SubmitHandler<SigninType> = async (data) => {
    if (isPending) return

    await signin(data)

    toast({ title: "Accesso effetuato con successo" })

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full px-[33px] pb-[30px] md:px-[50px] md:pb-[40px]"
      >
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
        <p className="font-medium text-[15px] mt-[47px] mb-5">
          Se non hai un account,{" "}
          <Link to="/signup" className="text-[#FCAE08] hover:underline">
            Registrati
          </Link>
        </p>
        <Button
          type="submit"
          className="w-full py-5 bg-[#C24C08]
        rounded-[26px] text-[24px] font-semibold"
        >
          Accedi
        </Button>
      </form>
    </Form>
  );
};
export default SigninForm;
