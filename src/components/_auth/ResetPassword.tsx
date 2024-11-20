import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import { useResetPassword } from "@/lib/react-query/mutations/authMutations";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signinSchema, SigninType } from "@/lib/validations/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  if (!token) return <Navigate to="/signin" />;

  const form = useForm<SigninType>({
    mode: "onSubmit",
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: resetPassword, isPending } = useResetPassword();

  const onSubmit: SubmitHandler<SigninType> = async ({
    email,
    password: newPassword,
  }) => {
    if (isPending || !token) return;

    try {
      const res = await resetPassword({ email, newPassword, token });
      toast({
        description: res.message,
      });
      navigate("/signin");
    } catch (err: any) {
      toast({
        title: "Errore",
        description:
          err.response?.data.message ??
          "Errore nel reset della password, riprovare",
        variant: "destructive",
      });
    }
  };

  // FormControl deve avere solo un unico figlio react

  return (
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
                  <CardFooter className="p-0">
                    <Button
                      type="submit"
                      className="btn w-full bg-[#ED0000] bg-opacity-50 rounded-xl py-3 px-4
    text-sm font-medium border border-[#FF0000] border-opacity-60
    hover:bg-[#ED0000] hover:bg-opacity-50 mt-3"
                    >
                      Resetta password
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
export default ResetPassword;
