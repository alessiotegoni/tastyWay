import { Button } from "@/components/ui/button";
import { useAddress } from "@/contexts/AddressContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    iconUrl: "/icons/user-info-icon.png",
    label: "Info profilo",
    value: "",
  },
  {
    iconUrl: "/icons/user-security-icon.png",
    label: "Sicurezza",
    value: "security",
  },
];

const UserProfileLayout = () => {
  const { user, logout } = useAuth();
  const { removeSelectedAddress } = useAddress();

  const fullName = `${user!.name} ${user!.surname}`;

  const handleLogout = async () => {
    await logout();
    removeSelectedAddress();
    toast({ description: "Logout effettuato con successo!" });
  };

  const userLinks = links.map((l, i) => (
    <NavLink
      key={i}
      to={l.value}
      className="
        btn client-nav-btn user-btn py-2 px-4 font-semibold backdrop-blur-3xl"
      end // attivo solo quando sono esattamente sulla route
      // (e non se fa parte di una sotto route)
    >
      <img src={l.iconUrl} alt={`${l.value} icon`} className="w-6 h-6" />
      {l.label}
    </NavLink>
  ));

  return (
    <main className="user-profile">
      <div className="container max-w-[570px]">
        <div className="user-profile__header mt-16 xl:mt-0">
          <figure
            className="p-3 self-center sm:self-auto bg-[#ED0000] bg-opacity-40
          rounded-3xl border border-[#ED0000] border-opacity-30"
          >
            <img
              src="/imgs/default-restaurant.png"
              alt=""
              className="w-[125px] h-[125px] object-cover rounded-2xl"
            />
          </figure>
          <div
            className="p-3 px-4 bg-[#ED0000] bg-opacity-40
          rounded-3xl border border-[#ED0000] border-opacity-30 grow
          flex flex-col justify-between"
          >
            <div>
              <h1 className="text-2xl font-semibold capitalize">{fullName}</h1>
              <p className="mt-2 text-sm font-normal text-white/80">
                Creato il <span>10/12/2024</span>
              </p>
            </div>
            <Button
              onClick={handleLogout}
              className="p-2 px-3 btn logout-btn m-0 rounded-xl self-end gap-2"
            >
              <img src="/icons/logout-door-icon.png" alt="logout-icon" />
              <p className="font-medium text-sm">Logout</p>
            </Button>
          </div>
        </div>
        <div className="flex gap-4 mt-9 mb-3">{userLinks}</div>
        <Outlet />
      </div>
    </main>
  );
};
export default UserProfileLayout;
