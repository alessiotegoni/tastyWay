import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface ClientFormBtnsProps<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>;
  defaultValues?: T | undefined;
  isLoading: boolean;
  className?: string;
}

const ClientFormBtns = <T extends FieldValues>({
  form,
  defaultValues,
  isLoading,
  className = "",
}: ClientFormBtnsProps<T>) =>
  form.formState.isDirty && (
    <div className={`flex justify-end items-center gap-2 mt-7 ${className}`}>
      <Button
        type="button"
        onClick={() => !isLoading && form.reset(defaultValues)}
        className="btn py-3 px-5 font-medium text-sm rounded-xl bg-red-700
      text-red-100 border-red-800"
      >
        Annulla modifiche
      </Button>
      <Button
        type="submit"
        className="btn py-3 px-5 font-medium text-sm rounded-xl bg-green-700
      text-green-100 border-green-800"
      >
        {isLoading ? <Loader2 /> : "Salva modifiche"}
      </Button>
    </div>
  );
export default ClientFormBtns;
