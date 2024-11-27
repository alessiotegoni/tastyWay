import { Navigate, useParams } from "react-router-dom";
import {
  useForgotPassword,
  useResetPassword,
} from "@/lib/react-query/mutations/authMutations";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signinSchema, SigninType } from "@/lib/validations/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { errorToast } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const { isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const { token } = useParams();

  const form = useForm<SigninType>({
    mode: "onSubmit",
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutateAsync: resetPassword,
    isPending: isResetting,
    isError,
    error,
  } = useResetPassword();
  const {
    mutateAsync: forgotPassword,
    isPending: isSendingToken,
    isSuccess: hasSentToken,
  } = useForgotPassword();

  const handleForgotPassword = async () => {
    if (isSendingToken || isResetting) return;

    const email = form.getValues("email");
    if (!email) {
      errorToast({ description: "Inserisci prima la tua email" });
      return;
    }

    await forgotPassword(email);
    setTimeout(() => window.close(), 5_000);
  };

  const onSubmit: SubmitHandler<SigninType> = async ({
    email,
    password: newPassword,
  }) => {
    if (isResetting || isSendingToken || !token) return;
    await resetPassword({ email, newPassword, token });
  };

  // FormControl deve avere solo un unico figlio react

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : !token ? (
    <Navigate to="/signin" />
  ) : (
    <div className="hero">
      <Navbar pageNum={0} />
      <main className="reset-password">
        <div className="container">
          <Card className="home-widget w-full max-w-[450px] rounded-4xl text-center">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl font-semibold">
                Resetta password
              </CardTitle>
              <CardDescription className="font-medium px-10">
                Inserisci la tua email e la nuova password nei campi sottostanti
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email" className="text-left block">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            className="signin-form-input py-6 px-4 rounded-xl placeholder:text-white/60 placeholder:font-normal"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="newPassword"
                          className="text-left block"
                        >
                          Nuova password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showPassword ? "text" : "password"}
                              className="signin-form-input py-6 px-4 rounded-xl pr-10 placeholder:text-white/60 placeholder:font-normal"
                              {...field}
                            />
                            {!!form.watch("password") && (
                              <Button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              >
                                {showPassword ? (
                                  <EyeOffIcon className="h-5 w-5" />
                                ) : (
                                  <EyeIcon className="h-5 w-5" />
                                )}
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex gap-2 p-0">
              {isError &&
                error.response?.data.message === "Token invalido o scaduto" &&
                !hasSentToken && (
                  <Button
                    type="button"
                    className="btn user-widget rounded-xl py-3 px-4
                text-sm font-medium border border-blue-800
                mt-7 basis-1/2 bg-blue-600 hover:bg-blue-700"
                    disabled={isSendingToken}
                    onClick={handleForgotPassword}
                  >
                    {isSendingToken ? <Loader2 /> : "Rimanda email"}
                  </Button>
                )}
              <Button
                type="submit"
                className="btn bg-[#ED0000] bg-opacity-50 rounded-xl py-3 px-4
    text-sm font-medium border border-[#FF0000] border-opacity-60
    hover:bg-[#ED0000] hover:bg-opacity-70 mt-7 basis-1/2 grow"
                onClick={() => form.handleSubmit(onSubmit)()}
                disabled={isResetting}
              >
                {isResetting ? <Loader2 /> : "Resetta password"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};
export default ResetPassword;
