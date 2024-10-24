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
import { ChangeEvent, useState } from "react";
import { useUpdateMyRestaurant } from "@/lib/react-query/mutations/restaurantMutations";
import { toast } from "@/hooks/use-toast";
import ClientFormBtns from "../ClientFormBtns";

const RestaurantProfileForm = ({
  restaurantName,
}: {
  restaurantName: string | undefined;
}) => {
  const [itemsImgUrl, setItemsImgUrl] = useState<(string | undefined)[]>([]);

  const form = useFormContext<RestaurantProfileType>();

  const { mutateAsync: updateRestaurant, isPending } = useUpdateMyRestaurant(
    form,
    restaurantName
  );

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

    if (!file) return;

    const url = URL.createObjectURL(file);
    const newUrls = [...itemsImgUrl];
    newUrls[itemIndex] = url;

    setItemsImgUrl(newUrls);
    form.setValue(`items.${itemIndex}.img`, file, { shouldDirty: true });
  };

  const onSubmit: SubmitHandler<RestaurantProfileType> = async (data) => {
    if (isPending) return;

    try {
      await updateRestaurant(data);
      toast({
        description: "Ristorante aggiornato con successo",
      });
    } catch (err: any) {
      toast({
        description:
          err.response.data.message ??
          "Errore nell'aggiornamento del ristorante",
        variant: "destructive",
      });
    }
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
                <Input
                  type="number"
                  id="deliveryPrice"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
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
                <Input
                  type="number"
                  id="deliveryTime"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
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
                      render={() => {
                        const imgUrl = itemsImgUrl.at(i) ?? item.img;

                        return (
                          <div className="flex flex-col justify-between">
                            {imgUrl && (
                              <figure className="flex-center mb-3">
                                <img
                                  src={imgUrl as string}
                                  alt={item.name}
                                  className="w-20 h-20 rounded-lg object-contain"
                                />
                              </figure>
                            )}
                            <div className="flex-between gap-2">
                              <Label
                                htmlFor={`items${i}Img`}
                                className={`px-1 border rounded-xl
                            border-white/80 text-center text-xs cursor-pointer grow
                            ${imgUrl ? "py-3" : "py-4 border-dashed"}`}
                              >
                                {imgUrl ? "Cambia" : "Aggiungi immagine"}
                              </Label>
                            </div>
                            <Input
                              type="file"
                              id={`items${i}Img`}
                              className="hidden"
                              onChange={(e) => handleUploadItemImg(e, i)}
                            />
                          </div>
                        );
                      }}
                    />
                    <div className="restaurant-item__info">
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
                          <Input
                            type="number"
                            placeholder="Prezzo"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
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
                            className="rounded-xl col-span-4"
                            {...field}
                          ></Textarea>
                        )}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <ClientFormBtns form={form} isLoading={isPending} />
      </form>
    </Form>
  );
};
export default RestaurantProfileForm;
