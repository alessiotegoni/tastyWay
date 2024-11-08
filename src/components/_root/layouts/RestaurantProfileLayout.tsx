import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddress } from "@/contexts/AddressContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useUpdateMyRestaurantImg } from "@/lib/react-query/mutations/restaurantMutations";
import { getDate } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    iconUrl: "/icons/user-info-icon.png",
    label: "Info ristorante",
    value: "",
  },
  {
    iconUrl: "/icons/user-security-icon.png",
    label: "Sicurezza",
    value: "security",
  },
  {
    iconUrl: "/icons/user-security-icon.png",
    label: "Info titolare",
    value: "owner",
  },
];

const RestaurantProfileLayout = () => {
  const { user: restaurant, logout } = useAuth();

  const [restaurantImg, setRestaurantImg] = useState(restaurant?.imageUrl);

  const { removeSelectedAddress } = useAddress();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    mutateAsync: updateImg,
    isPending,
    isError,
    error,
  } = useUpdateMyRestaurantImg();

  const fullName = restaurant?.restaurantName
    ? restaurant.restaurantName
    : `${restaurant!.name} ${restaurant!.surname}`;

  const handleLogout = async () => {
    await logout();
    removeSelectedAddress();
    toast({ description: "Logout effettuato con successo!" });
  };

  const handleUploadRestaurantImg = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.item(0);
    if (!file || isPending) return;

    const res = await updateImg(file);
    setRestaurantImg(res.imageUrl);
    toast({ description: res.message });
  };

  useEffect(() => {
    if (isError)
      toast({
        title: "Errore",
        description:
          error.response?.data.message ??
          "Erorre nel caricamento dell'immagine",
        variant: "destructive",
      });
  }, [isError, error]);

  const restaurantLinks = links.map((l, i) => (
    <NavLink
      key={i}
      to={l.value}
      className="btn client-nav-btn restaurant-btn py-2 px-4"
      end
    >
      <img src={l.iconUrl} alt={`${l.value} icon`} className="w-6 h-6" />
      <p className="hidden xs:block text-xs sm:text-base">{l.label}</p>
    </NavLink>
  ));

  return (
    <main className="restaurant-profile">
      <div className="container max-w-[570px] mt-16 xl:mt-0">
        <div className="restaurant-profile__header">
          <figure
            className={`p-3 border border-restaurant-primary-90 self-center
              sm:self-auto rounded-3xl flex-center bg-restaurant-primary-50 ${
                isPending ? "w-[151px] h-[151px]" : ""
              }`}
          >
            <Input
              ref={fileInputRef}
              type="file"
              className="w-0 h-0"
              id="restaurantImg"
              onChange={handleUploadRestaurantImg}
            />
            {isPending ? (
              <Loader2 />
            ) : restaurantImg ? (
              <img
                src={restaurantImg}
                alt=""
                className="sm:w-[125px] sm:h-[125px] object-cover rounded-2xl"
              />
            ) : (
              <Label
                htmlFor="restaurantImg"
                className="w-[125px] h-[125px] flex-center leading-5
                cursor-pointer text-center"
              >
                Aggiungi immagine
              </Label>
            )}
          </figure>
          <div
            className="p-4 bg-restaurant-primary-50
          rounded-3xl border border-restaurant-primary-90 grow
          flex flex-col justify-between"
          >
            <div>
              <h1 className="text-2xl font-semibold capitalize">{fullName}</h1>
              {restaurant?.createdAt && (
                <p className="mt-2 text-sm font-normal text-white/80">
                  Creato: <span>{getDate(restaurant.createdAt)}</span>
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-3 sm:mt-0">
              {restaurantImg && (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 px-3 btn restaurant-btn border
                  border-restaurant-primary-90 m-0 rounded-xl"
                >
                  <p className="font-medium text-sm">Cambia immagine</p>
                </Button>
              )}
              <Button
                onClick={handleLogout}
                className="p-2 px-3 btn logout-btn m-0 rounded-xl
                self-end gap-2"
              >
                <img src="/icons/logout-door-icon.png" alt="logout-icon" />
                <p className="font-medium text-sm">Logout</p>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4 mt-9 mb-3">{restaurantLinks}</div>
      </div>
      <div className="container max-w-[900px]">
        <Outlet />
      </div>
    </main>
  );
};
export default RestaurantProfileLayout;
