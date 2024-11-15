import { tastyWayLogo } from "@/constants";
import Navbar from "../shared/Navbar/Navbar";
import SigninForm from "./forms/SigninForm";
import { FormProvider, useForm } from "react-hook-form";
import { signinSchema, SigninType } from "@/lib/validations/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { defaultSigninValues as defaultValues } from "../../lib/validations/authSchemas";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { useGoogleAuth } from "@/lib/react-query/mutations/authMutations";

const Signin = () => {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { mutateAsync: login, isPending } = useGoogleAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      if (isPending) return;

      try {
        await login({ access_token });
      } catch (err) {
        toast({
          title: "Errore",
          description: "Errore nel login, riprovare",
          variant: "destructive",
        });
      }
    },
    onError: () =>
      toast({
        title: "Errore",
        description: "Errore nel login, riprovare",
        variant: "destructive",
      }),
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/contacts.readonly",
  });

  useEffect(() => {
    if (isAuthenticated) navigate(searchParams.get("redirect") ?? "/");
  }, [navigate, isAuthenticated]);

  const methods = useForm<SigninType>({
    resolver: zodResolver(signinSchema),
    mode: "onSubmit",
    defaultValues,
  });

  return (
    <div className="hero">
      <Navbar pageNum={1} />
      <main className="signin">
        <div className="container">
          <div className="col">
            <div className="card">
              <figure className="flex-center flex-col">
                <img
                  src={tastyWayLogo}
                  alt="Tasty-way-logo"
                  className="w-[135px] xs:w-[200px] sm:w-auto"
                />
                <figcaption className="text-3xl sm:text-[42px] font-semibold mt-2">
                  Login
                </figcaption>
              </figure>
              <FormProvider {...methods}>
                <SigninForm />
              </FormProvider>
              <p className="text-center font-medium my-3">oppure</p>
              <div className="md:flex-center gap-3">
                <Button
                  onClick={() => googleLogin()}
                  className="btn border-0 w-full sm:basis-1/2 h-16 px-4 bg-white"
                >
                  <figure className="flex-center gap-2">
                    <img
                      src="/icons/google-icon.webp"
                      alt="google icon"
                      className="w-10 h-10 text-white"
                    />
                    <figcaption className="font-semibold text-xl text-black">
                      Google
                    </figcaption>
                  </figure>
                </Button>
                <Button className="btn border-0 w-full sm:basis-1/2 bg-black h-16 px-4 mt-3 md:mt-0">
                  <figure className="flex-center gap-2">
                    <img
                      src="/icons/apple-icon.png"
                      alt="appple icon"
                      className="w-8 h-8"
                    />
                    <figcaption className="font-semibold text-xl">
                      Apple
                    </figcaption>
                  </figure>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Signin;
