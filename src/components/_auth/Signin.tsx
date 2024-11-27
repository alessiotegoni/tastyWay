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
import { useGoogleAuth } from "@/lib/react-query/mutations/authMutations";
import { errorToast } from "@/lib/utils";

const Signin = () => {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { mutateAsync: login, isPending } = useGoogleAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      if (isPending) return;

      await login({ access_token });
    },
    onError: () =>
      errorToast({
        description: "Errore nel login con google, riprovare",
      }),
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
              <Button
                onClick={() => googleLogin()}
                className="btn border-0 w-full h-16 px-4 bg-white"
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Signin;
