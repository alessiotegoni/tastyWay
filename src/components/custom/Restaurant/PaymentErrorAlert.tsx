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
          <AlertDialogTitle className="flex items-center gap-2 text-[#ec01017e]">
            <XCircle className="h-5 w-5" />
            Errore di Pagamento
          </AlertDialogTitle>
          <AlertDialogDescription>
            Siamo spiacenti, ma il pagamento non è andato a buon fine. Si prega
            di verificare i dettagli della carta e riprovare.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onClose}
            className="btn bg-home-widget-border-40 hover:bg-home-widget-border-70
             p-3 px-5 rounded-xl font-medium"
          >
            Chiudi
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onRetry}
            className="btn bg-[#ec01017e] p-3 px-5
              rounded-xl border-0 hover:bg-[#ec0101d9] font-medium"
          >
            Riprova il Pagamento
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentErrorAlert;
