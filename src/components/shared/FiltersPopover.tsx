"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

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

const restaurantsFilters = [
  {
    value: "cheap",
    label: "Economico",
  },
  {
    value: "expensive",
    label: "Costoso",
  },
  {
    value: "top_rated",
    label: "Migliori recensioni",
  },
  {
    value: "fast_delivery",
    label: "Consegna rapida",
  },
  {
    value: "new",
    label: "Nuovo",
  },
  {
    value: "trending",
    label: "Di tendenza",
  },
];

export const FiltersPopover = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  // FIXME: dropwdown colors and logic

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="flex-center gap-4 py-3 px-5
          rounded-[30px] bg-home-widget backdrop-blur-[123px]
          border border-primary-20 font-semibold text-[17px]"
        >
          <img
            src="/icons/filter-icon.png"
            alt="filter-icon"
            width={25}
            height={25}
          />
          {value
            ? restaurantsFilters.find((filter) => filter.value === value)?.label
            : "Filtra"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Cerca filtro..." className="h-9" />
          <CommandList>
            <CommandEmpty>No filter found.</CommandEmpty>
            <CommandGroup>
              {restaurantsFilters.map((filter) => (
                <CommandItem
                  key={filter.value}
                  value={filter.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {filter.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === filter.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FiltersPopover;
