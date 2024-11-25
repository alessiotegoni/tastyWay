import LocationAutocomplete from "@/components/shared/autocomplete/LocationAutocomplete";
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
import useAddress from "@/hooks/useAddress";
import { Loader2 } from "lucide-react";

interface ConfirmAddressDialogProps {
  disabled: boolean;
  handleCreateSession: () => void;
  isPending: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmAddressDialog = ({
  handleCreateSession,
  isPending,
  isOpen,
  onClose,
}: ConfirmAddressDialogProps) => {
  const { selectedAddress } = useAddress();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className="bg-home-widget backdrop-blur-[200px] border-0
      rounded-[40px]"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-[30px]">
            Confermare indirizzo?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-[15px]">
            Se confermi l'indirizzo l'ordine verra' spedito all'indirizzo da te
            inserito precedentemente, puoi sempre cambiarlo da qui
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="relative my-4">
          <LocationAutocomplete
            placeholder="Inserisci l'indirizzo dell'ordine"
            inputClassName="bg-transparent rounded-[15px] font-normal
            border-home-widget-border-60 focus:border-home-widget-border
            hover:bg-transparent"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onClose}
            className="btn px-4 py-3 bg-x-icon-bg-70
          hover:bg-x-icon-bg rounded-xl font-medium border-0"
          >
            Annulla
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={!selectedAddress || isPending}
            onClick={handleCreateSession}
            className="btn px-4 py-3 bg-primary-70
          hover:bg-primary-90 rounded-xl font-medium border-0"

          >
            {isPending ? <Loader2 /> : "Conferma"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ConfirmAddressDialog;
