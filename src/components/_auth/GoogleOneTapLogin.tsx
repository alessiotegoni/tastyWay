import { useGoogleAuth } from "@/lib/react-query/mutations/authMutations";
import { errorToast } from "@/lib/utils";
import { UserGoogleJwt } from "@/types/userTypes";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useMatch } from "react-router-dom";

const GoogleOneTapLogin = () => {
  const { mutateAsync: googleLogin, isPending } = useGoogleAuth();

  useGoogleOneTapLogin({
    onSuccess: async ({ credential }) => {
      if (!credential || isPending) return;

      try {
        const { email, given_name, family_name, picture } =
          jwtDecode<UserGoogleJwt>(credential);

        if (!email || !given_name || !family_name)
          throw new Error("Account google non valido");

        await googleLogin({
          userData: { email, given_name, family_name, picture },
        });
      } catch (err: any) {
        errorToast({
          err,
          description: "Errore nel login con google",
        });
      }
    },
    onError: () =>
      errorToast({
        description: "Errore nel login con google",
      }),
    disabled: !!useMatch("/signin"),
  });

  return <></>;
};
export default GoogleOneTapLogin;
