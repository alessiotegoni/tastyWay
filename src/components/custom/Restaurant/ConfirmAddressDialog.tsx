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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAddress } from "@/contexts/AddressContext";
import { CartItem } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { useCreateCheckoutSession } from "@/lib/react-query/mutations";

interface ConfirmAddressDialogProps {
  disabled: boolean;
  items: CartItem[];
  restaurantName: string;
}

const ConfirmAddressDialog = ({
  disabled,
  items,
  restaurantName,
}: ConfirmAddressDialogProps) => {
  const { selectedAddress } = useAddress();

  const {
    mutateAsync: createSession,
    isPending,
    isError,
    error,
  } = useCreateCheckoutSession();

  const handleClick = async () => {
    if (!items.length) return;

    try {
      const sessionUrl = await createSession({ items, restaurantName });

      console.log(sessionUrl);

      window.location.href = sessionUrl;
    } catch (err) {
      toast({
        title: "Errore",
        description: "Errore nel redirect alla pagina di pagamento",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={disabled}
        className="btn mt-4 bg-[#ec01017e] w-full py-[14px]
              rounded-xl border border-x-icon-bg-70 hover:bg-[#ec0101d9]"
      >
        Checkout
      </AlertDialogTrigger>
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
        <LocationAutocomplete
          placeholder="Inserisci l'indirizzo dell'ordine"
          shouldShowLatestResearchs={false}
          className="my-4"
          inputClassName="bg-transparent rounded-[15px] font-normal
          border-home-widget-border-60 focus:border-home-widget-border
          hover:bg-transparent"
        />
        <AlertDialogFooter>
          <AlertDialogCancel
            className="btn px-4 py-3 bg-x-icon-bg-70
          hover:bg-x-icon-bg rounded-xl font-medium border-0"
          >
            Annulla
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={!!!selectedAddress}
            onClick={handleClick}
            className="btn px-4 py-3 bg-primary-70
          hover:bg-primary-90 rounded-xl font-medium border-0"
          >
            Conferma
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ConfirmAddressDialog;
