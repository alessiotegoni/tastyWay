import RequireEmailVerification from "@/components/shared/RequireEmailVerification";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useUpdateUserSecurity } from "@/lib/react-query/mutations/userMutations";
import { errorToast } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { useMatch } from "react-router-dom";

const UserSecurity = () => {
  const { user } = useAuth();
  const isUser = useMatch("/user/security");

  const { isGoogleLogged } = user!;

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const { mutateAsync: updateUserSecurity, isPending } =
    useUpdateUserSecurity();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isPending) return;
    if (
      (isGoogleLogged && !newPassword) ||
      (!isGoogleLogged && (!newPassword || !oldPassword))
    )
      return;

    try {
      if (newPassword.length < 8)
        throw new Error("La nuova password deve avere almento 8 caratteri");

      await updateUserSecurity({ newPassword, oldPassword });
      toast({
        description: `Password ${
          isGoogleLogged ? "creata" : "modificata"
        } con successo`,
      });

      setNewPassword("");
      setOldPassword("");
    } catch (err: any) {
      errorToast({
        err,
        description: "Errore nell'aggiornamento della password",
      });
    }
  };

  const newPasswordInput = (
    <div className={isGoogleLogged ? "mt-5" : ""}>
      {!isGoogleLogged && <Label htmlFor="newPassword">Nuova password</Label>}
      <Input
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder={isGoogleLogged ? "Nuova password" : ""}
        className="placeholder:text-white/70"
      />
    </div>
  );

  return (
    <div
      className={`${
        isUser ? "user-widget user-security__body" : "restaurant-security__body"
      } text-left min-h-[300px]`}
    >
      <h2 className="text-2xl font-semibold">
        {isGoogleLogged ? "Crea" : "Modifica"} password
      </h2>
      {isGoogleLogged && (
        <p className="font-medium mt-1">
          Crea una password per accedere al meglio al tuo profilo
        </p>
      )}
      <RequireEmailVerification />
      <form
        onSubmit={handleSubmit}
        className="grow flex flex-col justify-between"
      >
        {isGoogleLogged ? (
          newPasswordInput
        ) : (
          <>
            <div>
              <Label htmlFor="oldPassword">Vecchia password</Label>
              <Input
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            {newPasswordInput}
          </>
        )}
        {((isGoogleLogged && !!newPassword) ||
          (!isGoogleLogged && !!newPassword && !!oldPassword)) && (
          <div className="flex justify-end mt-5">
            <Button
              type="submit"
              className="btn px-4 py-3 rounded-xl text-sm font-medium
          bg-green-700 border-green-500 hover:bg-green-600"
            >
              {isPending ? (
                <Loader2 />
              ) : (
                <>{isGoogleLogged ? "Crea" : "Modifica"} password</>
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
export default UserSecurity;
