"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { itemsTypes } from "@/constants";
import { RestaurantItemsTypes } from "@/types/restaurantTypes";

export function ItemsTypeSelect() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<RestaurantItemsTypes | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full items-select__btn justify-between
          text-white/80 text-sm font-medium"
        >
          {value
            ? itemsTypes.find((item) => item.value === value)?.label
            : "Scegli"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 items-type-select">
        <Command>
          <CommandInput
            placeholder="Cerca piatto"
            className="placeholder:text-white/80 placeholder:font-medium"
          />
          <CommandList>
            <CommandEmpty>Nessun piatto trovato</CommandEmpty>
            <CommandGroup>
              {itemsTypes.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(selectedValue) => {
                    const currentValue = selectedValue as RestaurantItemsTypes;
                    setValue(currentValue === value ? null : currentValue);
                    setOpen(false);
                  }}
                  className="cursor-pointer font-medium last:mb-2 first:mt-2"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
