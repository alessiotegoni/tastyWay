import { tastyWayLogo } from "@/constants";
import Navbar from "../shared/Navbar/Navbar";
import SigninForm from "./forms/SigninForm";
import { FormProvider, useForm } from "react-hook-form";
import { signinSchema, SigninType } from "@/lib/validations/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { defaultSigninValues as defaultValues } from "../../lib/validations/authSchemas";

const Signin = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [navigate, isAuthenticated]);

  const methods = useForm<SigninType>({
    resolver: zodResolver(signinSchema),
    mode: "onSubmit",
    defaultValues,
  });

  return (
    <section className="bg-auth flex flex-col items-center gap-5 pt-[80px]">
      <Navbar pageNum={1} />
      <main
        className="home-widget-bg
      mx-auto w-full max-w-[540px] rounded-[69px]
      flex flex-col items-center border border-primary-20"
      >
        <img
          src={tastyWayLogo}
          alt="Tasty-way-logo"
          className="text-center h-[155px] w-[396px] object-cover"
        />
        <h1 className="text-[42px] font-semibold">Login</h1>
        <FormProvider {...methods}>
          <SigninForm />
        </FormProvider>
      </main>
    </section>
  );
};
export default Signin;
