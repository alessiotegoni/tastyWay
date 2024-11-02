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
    <div className="hero">
      <Navbar pageNum={2} />
      <main className="signup">
        <div className="container">
          <div className="col card">
            <figure className="flex-center flex-col">
              <img src={tastyWayLogo} alt="Tasty-way-logo" className="w-[150px]" />
              <figcaption className="text-3xl sm:text-[42px] font-semibold mt-2">
                Registrazione
              </figcaption>
            </figure>
            <FormProvider {...methods}>
              <SignupForm />
            </FormProvider>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Signup;
