import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Navbar from "@/components/shared/Navbar/Navbar";
import {
  useSendVerificationEmail,
  useVerifyEmail,
} from "@/lib/react-query/mutations/authMutations";
import { errorToast } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ErrorWidget from "@/components/widgets/ErrorWidget";

export default function VerifyEmail() {
  const { user } = useAuth();

  const [otp, setOTP] = useState<string>("");

  const {
    mutateAsync: verifyEmail,
    isPending,
    isError,
    error,
  } = useVerifyEmail();
  const {
    sendEmail,
    isPending: isSendingCode,
    isSuccess: isSent,
  } = useSendVerificationEmail();

  const canSend = !isPending && !isSendingCode;

  const handleVerifyEmail = async () => {
    if (!canSend) return;

    if (otp.length !== 6) {
      errorToast({ description: "Inserisci un codice OTP valido a 6 cifre." });
      return;
    }

    await verifyEmail(otp);
  };

  return (
    <div className="hero">
      <Navbar pageNum={0} />
      <main className="verify-email">
        <div className="container max-w-md">
          {!user?.emailVerified ? (
            <Card className="home-widget rounded-4xl">
              <CardHeader className="p-0">
                <CardTitle className="font-semibold">
                  Verifica il tuo account
                </CardTitle>
                <CardDescription className="font-medium">
                  Inserisci il codice a 6 cifre inviato alla tua email.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-0 mt-5 mb-8">
                <InputOTP value={otp} onChange={setOTP} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </CardContent>
              <CardFooter className="justify-end items-center p-0 gap-2">
                {isError &&
                  error.response?.data.message ===
                    "Codice invalido o scaduto" && (
                    <Button
                      className="btn user-widget rounded-xl py-[10px] px-4
                text-sm font-medium border border-blue-800 w-fit
                 bg-blue-600 hover:bg-blue-700"
                      disabled={!canSend || isSent}
                      onClick={() => canSend && !isSent && sendEmail()}
                    >
                      {isSendingCode ? <Loader2 /> : "Rimanda codice"}
                    </Button>
                  )}
                <Button
                  onClick={handleVerifyEmail}
                  className="btn user-widget rounded-xl py-[10px]  w-fit px-4
                text-sm font-medium border border-primary border-opacity-90
                bg-home-widget-border-10 hover:bg-home-widget-border-30"
                  disabled={!canSend}
                >
                  {isPending ? <Loader2 /> : "Verifica email"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <ErrorWidget
              title="La tua email e' gia verificata"
              className="home-widget rounded-4xl"
              btns={[
                {
                  id: "goBack",
                  value: "Torna indietro",
                  goto: -1,
                  className: "btn user-btn-bg",
                },
              ]}
            />
          )}
        </div>
      </main>
    </div>
  );
}
