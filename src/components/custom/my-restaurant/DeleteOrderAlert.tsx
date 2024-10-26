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
import { toast } from "@/hooks/use-toast";
import { useDeleteOrder } from "@/lib/react-query/mutations/restaurantMutations";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function DeleteOrderAlert({ orderId }: { orderId: string }) {
  const {
    mutateAsync: deleteOrder,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  } = useDeleteOrder(orderId);

  const navigate = useNavigate();

  const handleDeleteOrder = async () => {
    if (!isPending) await deleteOrder();
  };

  useEffect(() => {
    if (isSuccess) {
      toast({ description: data.message });
      navigate("/active-orders");
    }
    if (isError)
      toast({
        description:
          error.response?.data.message ??
          "Errore nell'eliminazione dell'ordine",
        variant: "destructive",
      });
  }, [data, isSuccess, isError, error]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="btn bg-[#B40000] bg-opacity-80
          border-[#ED0000] border-opacity-50 font-semibold py-3 px-5
          hover:bg-opacity-100"
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
