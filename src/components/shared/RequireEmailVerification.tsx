import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSendVerificationEmail } from "@/lib/react-query/mutations/authMutations";
import { useAuth } from "@/contexts/AuthContext";

export default function RequireEmailVerification() {
  const { user } = useAuth();

  const { sendEmail, isPending, isSuccess } = useSendVerificationEmail();

  return (
    !user?.emailVerified && (
      <Card
        className="w-full mx-auto bg-amber-50 border-amber-200 p-2
    rounded-2xl mt-5"
      >
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2 text-amber-800 text-lg">
            <Mail className="h-6 w-6 text-amber-500" />
            Verifica la tua email
          </CardTitle>
          <CardDescription className="text-amber-700 font-medium">
            Per effettuare modifiche al tuo account o fare ordini, è necessario
            verificare la tua email.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex justify-end">
          {!isSuccess && (
            <Button
              onClick={sendEmail}
              disabled={isPending}
              className="btn mt-2 py-[10px] px-4 font-medium rounded-xl
            bg-amber-500 hover:bg-amber-600 text-sm text-white
            border-0"
            >
              {isPending ? <Loader2 /> : "Invia email di verifica"}
            </Button>
          )}
        </CardContent>
      </Card>
    )
  );
}
