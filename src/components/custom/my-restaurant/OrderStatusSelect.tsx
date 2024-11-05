import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OrderStatus } from "@/types/restaurantTypes";
import { useEffect, useState } from "react";
import { useUpdateOrderStatus } from "@/lib/react-query/mutations/restaurantMutations";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SelectOrderStatusProps {
  currentStatus: OrderStatus;
  orderId: string;
}

const statuses: OrderStatus[] = [
  "In attesa",
  "Accettato",
  "In preparazione",
  "In consegna",
  "Consegnato",
];

export function SelectOrderStatus({
  currentStatus,
  orderId,
}: SelectOrderStatusProps) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<OrderStatus>(currentStatus);

  const {
    data,
    isSuccess,
    mutateAsync: updateOrderStatus,
    isPending,
    isError,
    error,
  } = useUpdateOrderStatus(orderId);

  useEffect(() => {
    if (selectedStatus !== currentStatus) updateOrderStatus(selectedStatus);
  }, [selectedStatus]);

  useEffect(() => {
    if (isSuccess) toast({ description: data.message });
    if (isError)
      toast({
        description:
          error.response?.data.message ??
          "Errore nell'aggiornamento dello stato dell'ordine",
      });
  }, [isSuccess, isError, data]);

  return (
    <div
      className="btn py-3 px-5 bg-[#2A003E] border-transparent
     flex items-center space-x-4"
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex-center gap-3">
            <Button className="font-semibold">Cambia stato dell'ordine</Button>
            {isPending && <Loader2 />}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="restaurant-widget p-3"
          align="center"
        >
          <Command>
            <CommandList>
              <CommandGroup>
                {statuses
                  .filter((s) => s !== currentStatus)
                  .map((status) => (
                    <CommandItem
                      key={status}
                      value={status}
                      onSelect={(value) => {
                        const currentValue = value as OrderStatus;
                        setSelectedStatus(
                          statuses.find((s) => s === currentValue) ||
                            currentStatus
                        );
                        setOpen(false);
                      }}
                      className="gap-3 cursor-pointer"
                    >
                      <img
                        src={`/icons/${status
                          .toLowerCase()
                          .replaceAll(" ", "-")}-icon.png`}
                        alt={status}
                        width={30}
                      />
                      <span>{status}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
