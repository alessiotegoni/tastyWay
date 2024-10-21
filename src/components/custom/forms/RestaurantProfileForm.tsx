import LocationAutocomplete from "@/components/shared/autocomplete/LocationAutocomplete";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RestaurantProfileType } from "@/lib/validations/RestaurantProfileSchema";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";
import { CuisineTypesSelect } from "../CuisineTypesSelect";
import { ItemsTypeSelect } from "../ItemsTypeSelect";
import { ChangeEvent } from "react";

const RestaurantProfileForm = () => {
  const form = useFormContext<RestaurantProfileType>();

  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({ control: form.control, name: "items" });

  const handleUploadItemImg = (
    e: ChangeEvent<HTMLInputElement>,
    itemIndex: number
  ) => {
    const file = e.target.files?.item(0);
    if (file)
      form.setValue(`items.${itemIndex}.img`, file, { shouldDirty: true });
  };

  const onSubmit: SubmitHandler<RestaurantProfileType> = async (data) => {
    console.log(data);
  };

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div>
                <Label id="name" className="mb-3">
                  Nome
                </Label>
                <Input id="name" {...field} />
              </div>
            )}
          />
          <div className="grow">
            <Label htmlFor="address" className="mb-3">
              Indirizzo
            </Label>
            <LocationAutocomplete
              placeholder=""
              shouldShowLatestResearchs={false}
              defaultValue={form.getValues("address")}
            />
          </div>
        </div>
        <div className="flex my-5 gap-3">
          <FormField
            control={form.control}
            name="deliveryInfo.price"
            render={({ field }) => (
              <div>
                <Label id="deliveryPrice" className="mb-3">
                  Prezzo di consegna
                </Label>
                <Input type="number" id="deliveryPrice" {...field} />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryInfo.time"
            render={({ field }) => (
              <div>
                <Label id="deliveryTime" className="mb-3">
                  Temo di consegna (minuti)
                </Label>
                <Input type="number" id="deliveryTime" {...field} />
              </div>
            )}
          />
        </div>
        <div className="">
          <h3 className="text-2xl font-semibold">Cucina</h3>
          <p className="font-medium text-sm mt-2">
            Scegli il tipo di cucina che porta il tuo ristorante
          </p>
          <FormField
            control={form.control}
            name="cuisine"
            render={() => (
              <div className="mt-3 mb-5">
                <CuisineTypesSelect />
              </div>
            )}
          />
        </div>
        <div className="">
          <h3 className="text-2xl font-semibold">Menu</h3>
          <p className="font-medium text-sm mt-2">
            Crea i piatti del tuo ristorante
          </p>
          <Button
            type="button"
            onClick={() =>
              append({
                img: null,
                name: "",
                description: "",
                price: 0,
                type: null,
              })
            }
            className="btn font-semibold mt-3
          bg-[#09020c] py-3 px-5 rounded-xl border-none"
          >
            Aggiungi piatto
          </Button>
          {!!items.length && (
            <>
              <div className="restaurant-item__table__head">
                <p className="font-medium text-sm mb-2">Immagine</p>
                <p className="font-medium text-sm mb-2">Nome</p>
                <p className="font-medium text-sm mb-2">Prezzo</p>
                <p className="font-medium text-sm mb-2">Tipo di piatto</p>
              </div>
              <ul className="space-y-10">
                {items.map((item, i) => (
                  <li key={item.id} className="restaurant-item__table__body">
                    <FormField
                      control={form.control}
                      name={`items.${i}.img`}
                      render={() => (
                        <div>
                          <Label
                            htmlFor={`items${i}Img`}
                            className="py-4 px-1 border border-dashed rounded-xl
                          border-white/80 text-center text-xs cursor-pointer"
                          >
                            Aggiungi immagine
                          </Label>
                          <Input
                            type="file"
                            id={`items${i}Img`}
                            className="hidden"
                            onChange={(e) => handleUploadItemImg(e, i)}
                          />
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${i}.name`}
                      render={({ field }) => (
                        <Input placeholder="Nome" {...field} />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${i}.price`}
                      render={({ field }) => (
                        <Input type="number" placeholder="Prezzo" {...field} />
                      )}
                    />
                    <ItemsTypeSelect itemIndex={i} />
                    <Button
                      type="button"
                      onClick={() => remove(i)}
                      className="btn bg-[#ED0000] bg-opacity-50
                        border-[#ED0000] border-opacity-60 font-semibold
                        hover:bg-opacity-60 rounded-xl px-5 text-sm"
                    >
                      Rimuovi
                    </Button>
                    <FormField
                      control={form.control}
                      name={`items.${i}.description`}
                      render={({ field }) => (
                        <Textarea
                          placeholder="Descrizione"
                          className="col-start-2 col-span-4 rounded-xl"
                          {...field}
                        ></Textarea>
                      )}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        {form.formState.isDirty && (
          <div className="flex justify-end items-center gap-2 mt-7">
            <Button
              type="button"
              onClick={() => form.reset()}
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
              Salva modifiche
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
export default RestaurantProfileForm;