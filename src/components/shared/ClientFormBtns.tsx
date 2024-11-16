import { FieldValues, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface ClientFormBtnsProps<T extends FieldValues> {
  defaultValues?: T | undefined;
  isLoading: boolean;
  setItemsImgUrl?: React.Dispatch<React.SetStateAction<(string | undefined)[]>>;
  className?: string;
}

const ClientFormBtns = <T extends FieldValues>({
  defaultValues,
  isLoading,
  setItemsImgUrl,
  className = "",
}: ClientFormBtnsProps<T>) => {
  const form = useFormContext();

  const handleCancelChanges = () => {
    if (!isLoading) form.reset(defaultValues);
    if (setItemsImgUrl) setItemsImgUrl([]);
  };

  return (
    form.formState.isDirty && (
      <div className={`flex justify-end items-center gap-2 mt-7 ${className}`}>
        <Button
          type="button"
          onClick={handleCancelChanges}
          className="btn bg-[#ED0000] bg-opacity-50 rounded-xl py-3 px-4
    text-sm font-medium border border-[#FF0000] border-opacity-60
    hover:bg-[#ED0000] hover:bg-opacity-50;"
        >
          Annulla modifiche
        </Button>
        <Button
          type="submit"
          className="btn px-4 py-3 rounded-xl text-sm font-medium
          bg-green-700 border-green-500 hover:bg-green-600"
        >
          {isLoading ? <Loader2 /> : "Salva modifiche"}
        </Button>
      </div>
    )
  );
};
export default ClientFormBtns;
