import { XCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PaymentErrAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
}

const PaymentErrorAlert = ({
  isOpen,
  onClose,
  onRetry,
}: PaymentErrAlertProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="home-widget">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600 text-2xl">
            <XCircle className="h-5 w-5" />
            Errore di Pagamento
          </AlertDialogTitle>
          <AlertDialogDescription>
            Siamo spiacenti, ma il pagamento non è andato a buon fine. Si prega
            di verificare i dettagli della carta e riprovare.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-3">
          <AlertDialogCancel
            onClick={onClose}
            className="btn bg-home-widget-border-40 hover:bg-home-widget-border-70
             px-5 rounded-xl font-medium"
          >
            Chiudi
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onRetry}
            className="btn bg-[#ec01017e] py-3 px-5
              rounded-xl hover:bg-[#ec0101d9] font-medium
             border-[#ec0101d9]"
          >
            Riprova il Pagamento
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentErrorAlert;
