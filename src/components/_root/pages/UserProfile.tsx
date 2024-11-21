import UserProfileForm from "@/components/custom/forms/UserProfileForm";
import RequireEmailVerification from "@/components/shared/RequireEmailVerification";
import {
  defaultUserValues,
  userProfileSchema,
  UserProfileType,
} from "@/lib/validations/userProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useMatch } from "react-router-dom";

const UserProfile = () => {
  const form = useForm<UserProfileType>({
    resolver: zodResolver(userProfileSchema),
    mode: "onSubmit",
    defaultValues: defaultUserValues,
  });

  return (
    <section
      className={`${
        useMatch("/user")
          ? "user-profile__body user-widget"
          : "restaurant-owner__body"
      }`}
    >
      <h2 className="text-2xl font-semibold">Dettagli Account</h2>
      <RequireEmailVerification />
      <FormProvider {...form}>
        <UserProfileForm />
      </FormProvider>
    </section>
  );
};
export default UserProfile;
