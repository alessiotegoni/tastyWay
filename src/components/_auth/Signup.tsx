import { tastyWayLogo } from "@/constants";
import Navbar from "../shared/Navbar/Navbar";
import SignupForm from "./forms/SignupForm";
import { FormProvider, useForm } from "react-hook-form";
import { signupSchema, SignupType } from "@/lib/validations/authSchemas";
import { defaultSignupValues as defaultValues } from "../../lib/validations/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

const Signup = () => {
  const methods = useForm<SignupType>({
    mode: "onSubmit",
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  return (
    <section className="bg-auth flex flex-col items-center gap-5 pb-0">
      <Navbar pageNum={2} />
      <main
        className="home-widget-bg
      mx-auto w-full max-w-[650px] rounded-[69px]
      flex flex-col items-center border border-primary-20"
      >
          <img
            src={tastyWayLogo}
            alt="Tasty-way-logo"
            className="text-center w-[350px] h-[120px] object-cover mt-2"
          />
          <h1 className="text-[35px] font-semibold">Registrazione</h1>
        <FormProvider {...methods}>
          <SignupForm />
        </FormProvider>
      </main>
    </section>
  );
};
export default Signup;
