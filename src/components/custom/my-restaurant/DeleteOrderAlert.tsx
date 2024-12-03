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
import { Button } from "@/components/ui/button";
import { useDeleteOrder } from "@/lib/react-query/mutations/restaurantMutations";
import { Loader2 } from "lucide-react";

export function DeleteOrderAlert({ orderId }: { orderId: string }) {
  const { handleDeleteOrder, isPending } = useDeleteOrder(orderId);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="btn grow sm:grow-0 bg-[#B40000] bg-opacity-80
          border-[#ED0000] border-opacity-50 font-semibold py-3 px-5
          hover:bg-opacity-100" disabled={isPending}
        >
          Cancella ordine
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="restaurant-widget">
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
          <AlertDialogDescription>
            Questa azione e' irreversibile, cancella l'ordine solo se sei sicuro
            che l'utente non lo vuole piu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="btn py-2 px-4 bg-[#2A003E]
          rounded-xl border-transparent font-semibold"
          >
            Cancella
          </AlertDialogCancel>
          <AlertDialogAction
            className="btn py-2 px-4 btn bg-[#B40000] bg-opacity-80
          border-[#ED0000] border-opacity-50
          hover:bg-opacity-100 rounded-xl font-semibold"
            onClick={handleDeleteOrder}
          >
            {isPending ? <Loader2 /> : "Continua"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
