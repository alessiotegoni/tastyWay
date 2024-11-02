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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Signin;
