import LocationAutocomplete from "@/components/shared/autocomplete/LocationAutocomplete";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RestaurantProfileType } from "@/lib/validations/RestaurantProfileSchema";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";
import { CuisineTypesSelect } from "../my-restaurant/CuisineTypesSelect";
import { ItemsTypeSelect } from "../my-restaurant/ItemsTypeSelect";
import { ChangeEvent, useEffect, useState } from "react";
import { useUpdateMyRestaurant } from "@/lib/react-query/mutations/restaurantMutations";
import { toast } from "@/hooks/use-toast";
import ClientFormBtns from "../../shared/ClientFormBtns";
import { useAuth } from "@/contexts/AuthContext";

interface RestaurantProfileProps {
  restaurantName: string | undefined;
}

const RestaurantProfileForm = ({ restaurantName }: RestaurantProfileProps) => {
  const { user } = useAuth();

  const [itemsImgUrl, setItemsImgUrl] = useState<(string | undefined)[]>([]);

  const form = useFormContext<RestaurantProfileType>();

  const { mutateAsync: updateRestaurant, isPending: isUpdating } =
    useUpdateMyRestaurant(form, restaurantName);

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
    if (isUpdating) return;

    if (!user?.imageUrl) {
      toast({ description: "Aggiungi l'immagine del tuo ristorante" });
      return;
    }

    await updateRestaurant(data);
  };

  const formErrors = form.formState.errors;

  useEffect(() => {
    if (formErrors.items?.message) {
      toast({
        description: formErrors.items.message,
      });
    }
  }, [formErrors]);

  console.log(formErrors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div>
                <FormLabel htmlFor="name" className="mb-3">
                  Nome
                </FormLabel>
                <Input id="name" {...field} />
                <FormMessage />
              </div>
            )}
          />
          <div className="grow relative">
            <FormLabel htmlFor="address" className="mb-3">
              Indirizzo
            </FormLabel>
            <LocationAutocomplete />
          </div>
        </div>
        <div className="flex my-5 gap-3">
          <FormField
            control={form.control}
            name="deliveryInfo.price"
            render={({ field }) => (
              <div className="basis-1/2">
                <FormLabel htmlFor="deliveryPrice" className="mb-3">
                  Prezzo di consegna
                </FormLabel>
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
              <div className="basis-1/2">
                <FormLabel
                  id="deliveryTime"
                  className="text-xs h-[14px] sm:text-sm mb-3"
                >
                  Tempo di consegna (m)
                </FormLabel>
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
              <ul className="space-y-10 mt-5 md:mt-0">
                {items.map((item, i) => (
                  <li key={item.id} className="md:restaurant-item__table__body">
                    <FormField
                      control={form.control}
                      name={`items.${i}.img`}
                      render={() => {
                        const imgUrl = itemsImgUrl.at(i) ?? item.img;

                        return (
                          <div
                            className="min-w-[104px] flex flex-col justify-between
                            items-center md:items-stretch mb-3 md:mb-0"
                          >
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
                              <FormLabel
                                htmlFor={`items${i}Img`}
                                className={`px-1 border rounded-xl
                            border-white/80 text-center text-xs cursor-pointer grow
                            ${
                              imgUrl ? "py-3" : "py-4 border-dashed"
                            } px-12 md:px-0`}
                              >
                                {imgUrl ? "Cambia" : "Aggiungi immagine"}
                              </FormLabel>
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
                          <div className="col-span-4 md:col-span-1">
                            <FormLabel className="md:hidden mb-2">
                              Nome
                            </FormLabel>
                            <Input placeholder="Nome" {...field} />
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${i}.price`}
                        render={({ field }) => (
                          <div className="col-span-4 sm:col-span-1">
                            <FormLabel className="md:hidden mb-2">
                              Prezzo
                            </FormLabel>
                            <Input
                              type="number"
                              placeholder="Prezzo"
                              {...field}
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber)
                              }
                            />
                          </div>
                        )}
                      />

                      <div className="col-span-4 sm:col-span-3 md:col-span-1">
                        <FormLabel className="md:hidden mb-2">
                          Tipo di piatto
                        </FormLabel>
                        <ItemsTypeSelect itemIndex={i} />
                      </div>

                      <FormField
                        control={form.control}
                        name={`items.${i}.description`}
                        render={({ field }) => (
                          <div className="col-span-4 md:col-span-3">
                            <FormLabel className="md:hidden mb-2">
                              Descrizione
                            </FormLabel>
                            <Textarea
                              placeholder="Descrizione"
                              className="rounded-xl text-xs sm:text-sm"
                              {...field}
                            ></Textarea>
                          </div>
                        )}
                      />
                    </div>
                    <div className="flex-center mt-3 md:mt-0">
                      <Button
                        type="button"
                        onClick={() => remove(i)}
                        className="btn bg-[#ED0000] bg-opacity-50
                            border-[#ED0000] border-opacity-60 font-semibold
                            hover:bg-opacity-60 rounded-xl py-3 px-5 text-sm
                            "
                      >
                        Rimuovi
                      </Button>
                    </div>
                    {item._id && (
                      <Input
                        name={`items.${i}._id`}
                        value={item._id}
                        className="hidden"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <ClientFormBtns
          isLoading={isUpdating}
          setItemsImgUrl={setItemsImgUrl}
        />
      </form>
    </Form>
  );
};
export default RestaurantProfileForm;
