import { tastyWayLogo } from "@/constants";
import Navbar from "../shared/Navbar/Navbar";
import SigninForm from "./forms/SigninForm";
import { FormProvider, useForm } from "react-hook-form";
import { signinSchema, SigninType } from "@/lib/validations/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultSigninValues as defaultValues } from "../../lib/validations/authSchemas";

const Signin = () => {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const redirectPath = queryParams.get("redirect");

    if (isAuthenticated) navigate(redirectPath ?? "/");
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
          <div className="col card">
            <figure className="flex-center">
              <img src={tastyWayLogo} alt="Tasty-way-logo" />
            </figure>
            <figcaption className="text-[42px] font-semibold mt-2">
              Login
            </figcaption>
            <FormProvider {...methods}>
              <SigninForm />
            </FormProvider>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Signin;
