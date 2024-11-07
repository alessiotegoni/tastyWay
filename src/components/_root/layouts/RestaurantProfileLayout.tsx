import { Button } from "@/components/ui/button";
import { useAddress } from "@/contexts/AddressContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
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
  const { removeSelectedAddress } = useAddress();

  const fullName = restaurant?.restaurantName
    ? restaurant.restaurantName
    : `${restaurant!.name} ${restaurant!.surname}`;

  const handleLogout = async () => {
    await logout();
    removeSelectedAddress();
    toast({ description: "Logout effettuato con successo!" });
  };

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
            className="p-3 w-full sm:w-fit self-center sm:self-auto bg-restaurant-primary-50
          rounded-3xl border border-restaurant-primary-90"
          >
            <img
              src={`${restaurant?.imageUrl ?? "/imgs/default-restaurant.png"}`}
              alt=""
              className="sm:w-[125px] sm:h-[125px] object-cover rounded-2xl"
            />
          </figure>
          <div
            className="p-3 px-4 bg-restaurant-primary-50
          rounded-3xl border border-restaurant-primary-90 grow
          flex flex-col justify-between"
          >
            <div>
              <h1 className="text-2xl font-semibold capitalize">{fullName}</h1>
              <p className="mt-2 text-sm font-normal text-white/80">
                Creato il <span>{restaurant?.createdAt ?? "10/10/2024"}</span>
              </p>
            </div>
            <Button
              onClick={handleLogout}
              className="p-2 px-3 btn logout-btn m-0 rounded-xl
              self-end gap-2 mt-2 sm:mt-0"
            >
              <img src="/icons/logout-door-icon.png" alt="logout-icon" />
              <p className="font-medium text-sm">Logout</p>
            </Button>
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
