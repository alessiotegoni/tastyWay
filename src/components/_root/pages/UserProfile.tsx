import UserProfileForm from "@/components/custom/forms/user/UserProfileForm";
import {
  userProfileSchema,
  UserProfileType,
} from "@/lib/validations/userProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const UserProfile = () => {
  const form = useForm<UserProfileType>({
    resolver: zodResolver(userProfileSchema),
    mode: "onSubmit",
  });

  return (
    <section className="user-profile__body user-widget">
      <h2 className="text-2xl font-semibold">Dettagli Account</h2>
      <FormProvider {...form}>
        <UserProfileForm />
      </FormProvider>
    </section>
  );
};
export default UserProfile;
