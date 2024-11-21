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
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/shared/Navbar/Navbar";
import {
  useSendVerificationEmail,
  useVerifyEmail,
} from "@/lib/react-query/mutations/authMutations";
import { showErrorToast } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [otp, setOTP] = useState<string>("");

  const navigate = useNavigate();

  const {
    mutateAsync: verifyEmail,
    isPending,
    isError,
    error,
  } = useVerifyEmail();
  const {
    mutateAsync: sendEmail,
    isPending: isSendingCode,
    isSuccess: isSent,
  } = useSendVerificationEmail();

  const canSend = !isPending && !isSendingCode;

  const handleResendCode = async () => {
    if (!canSend || isSent) return;

    try {
      const res = await sendEmail();

      toast({ description: res.message });
    } catch (err) {
      showErrorToast({ err });
    }
  };

  const handleVerifyEmail = async () => {
    if (!canSend) return;

    try {
      if (otp.length !== 6)
        throw new Error("Inserisci un codice OTP valido a 6 cifre.");

      const res = await verifyEmail(otp);

      toast({ description: res.message });
      navigate(-1);
    } catch (err) {
      showErrorToast({ err });
    }
  };

  return (
    <div className="hero">
      <Navbar pageNum={0} />
      <main className="verify-email">
        <div className="container max-w-md">
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
                  {Array.from({ length: 6 }, (_, i) => (
                    <InputOTPSlot key={i} index={i} className="font-medium" />
                  ))}
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
                    onClick={handleResendCode}
                  >
                    {isSendingCode ? <Loader2 /> : "Rimanda codice"}
                  </Button>
                )}
              <Button
                onClick={handleVerifyEmail}
                className="btn user-widget rounded-xl py-[10px]  w-fit px-4
                text-sm font-medium border border-primary border-opacity-90
                bg-home-widget-border-10 hover:bg-home-widget-border-30"
              >
                {isPending ? <Loader2 /> : "Verifica email"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
