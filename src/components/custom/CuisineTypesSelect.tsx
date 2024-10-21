import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, XIcon } from "lucide-react";

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
import { foodFilters } from "@/constants";
import { useFormContext } from "react-hook-form";
import { FoodType } from "@/types/restaurantTypes";

const cuisine = foodFilters.map((f) => ({ value: f.value, label: f.name }));

export function CuisineTypesSelect() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<FoodType[]>([]);

  const form = useFormContext<{ cuisine: FoodType[] }>();

  const restaurantCuisine = form.getValues("cuisine");

  useEffect(() => {
    if (restaurantCuisine?.length) setValues(restaurantCuisine);
  }, [restaurantCuisine]);

  const setFormValue = (newCuisine: FoodType[]) =>
    form.setValue("cuisine", newCuisine, { shouldDirty: true });

  const handleOnSelect = (value: string) => {
    const selectedValue = value as FoodType;

    let newCuisine = [...values];

    if (values.includes(selectedValue)) {
      newCuisine = values.filter((v) => v !== selectedValue);
    } else {
      newCuisine = [...values, selectedValue];
    }

    setValues(newCuisine);
    setFormValue(newCuisine);
  };

  const handleRemoveCuisine = (cuisine: { value: FoodType; label: string }) => {
    const newCuisine = values.filter((v) => v !== cuisine.value);

    setFormValue(newCuisine);
    setValues(newCuisine);
  };

  return (
    <div className="flex items-center gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between py-3 px-5
            cuisine-select__btn font-semibold"
          >
            {/* {values.length
              ? cuisine.find((cuisine) => cuisine.value === values.at(0))?.label
              : "Scegli"} */}
            Scegli
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 cuisine-select">
          <Command>
            <CommandInput
              placeholder="Cerca cucina..."
              className="placeholder:text-white/80 placeholder:font-medium"
            />
            <CommandList>
              <CommandEmpty>Nessuna cuicina trovata</CommandEmpty>
              <CommandGroup>
                {cuisine.map((cuisine) => (
                  <CommandItem
                    key={cuisine.value}
                    value={cuisine.value}
                    className="cursor-pointer font-medium last:mb-2 first:mt-2"
                    onSelect={handleOnSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        values.includes(cuisine.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {cuisine.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <ul className="flex flex-wrap gap-2">
        {cuisine
          .filter((c) => values.includes(c.value))
          .map((c) => (
            <li
              className="flex-center gap-2 bg-[#7800B0] bg-opacity-65
              hover:bg-[#7800B0] hover:bg-opacity-70 border-none
              text-sm placeholder:text-sm font-semibold rounded-xl p-3"
            >
              {c.label}
              <XIcon
                onClick={() => handleRemoveCuisine(c)}
                className="cursor-pointer w-6 text-red-700"
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
