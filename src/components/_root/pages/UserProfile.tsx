import UserProfileForm from "@/components/custom/forms/user/UserProfileForm";
import { useGetUserProfile } from "@/lib/react-query/queries";
import {
  userProfileSchema,
  UserProfileType,
} from "@/lib/validations/userProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const UserProfile = () => {
  const { data: userProfile, isLoading, isError, error } = useGetUserProfile();

  const form = useForm<UserProfileType>({
    resolver: zodResolver(userProfileSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (userProfile) form.reset(userProfile);
  }, [userProfile]);

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
