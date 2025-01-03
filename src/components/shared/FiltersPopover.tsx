import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

type Filter = { value: string; label: string };

interface FiltersPopoverProps {
  filters: Filter[];
  setFilters: (currentValue?: any) => void;
}

export const FiltersPopover = ({
  filters,
  setFilters,
}: FiltersPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelect = (currentValue: string) => {
    setFilters(currentValue);

    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
  };

  useEffect(() => {
    if (!value) setFilters();
  }, [value]);

  const currentFilter = value
    ? filters.find((filter) => filter.value === value)?.label
    : "Filtra";

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
          {currentFilter}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-4 rounded-[30px] bg-home-dropdown
       mt-2 backdrop-blur-[130px] border-home-widget-border-30 border-t-0"
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {filters.map((filter) => (
                <CommandItem
                  key={filter.value}
                  value={filter.value}
                  onSelect={handleSelect}
                  className="cursor-pointer"
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
