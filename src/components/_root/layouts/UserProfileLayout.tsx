import { Button } from "@/components/ui/button";
import { getDate } from "@/lib/utils";
import { NavLink, Outlet } from "react-router-dom";
import { useRef } from "react";
import { useUpdateUserImg } from "@/lib/react-query/mutations/userMutations";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

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

  const { name, surname, imageUrl, createdAt } = user!;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleUploadImg, isPending } = useUpdateUserImg();

  return (
    <main className="user-profile">
      <div className="container max-w-[570px]">
        <div className="user-profile__header mt-16 xl:mt-0">
          <div className="flex-center sm:block bg-transparent">
            <figure
              className={`p-3 bg-[#ED0000] bg-opacity-40
          rounded-3xl border border-[#ED0000] border-opacity-30 ${
            isPending ? "w-[151px] h-[151px] flex-center" : ""
          }`}
            >
              <Input
                ref={fileInputRef}
                type="file"
                className="w-0 h-0"
                id="restaurantImg"
                onChange={handleUploadImg}
              />
              {isPending ? (
                <Loader2 />
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  className="w-[125px] h-[125px] object-cover rounded-2xl"
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
          </div>
          <div
            className="p-3 px-4 bg-[#ED0000] bg-opacity-40
          rounded-3xl border border-[#ED0000] border-opacity-30 grow
          flex flex-col justify-between"
          >
            <div>
              <h1 className="text-2xl font-semibold capitalize">{`${name} ${surname}`}</h1>
              <p className="mt-2 text-sm font-normal text-white/80">
                Creato: <span>{getDate(createdAt)}</span>
              </p>
            </div>
            <div className="flex justify-end gap-2 mt-3 sm:mt-0">
              {imageUrl && (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn p-2 px-3 bg-emerald-800 border-emerald-600
                  hover:bg-emerald-700 m-0 rounded-xl"
                >
                  <p className="font-medium text-sm">Cambia immagine</p>
                </Button>
              )}
              <Button
                onClick={() => logout()}
                className="p-2 px-3 btn logout-btn m-0 rounded-xl self-end gap-2"
              >
                <img src="/icons/logout-door-icon.png" alt="logout-icon" />
                <p className="font-medium text-sm">Logout</p>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-9 mb-3">
          {links.map((l, i) => (
            <NavLink
              key={i}
              to={l.value}
              className="
        btn client-nav-btn user-btn py-2 px-4 font-semibold backdrop-blur-3xl"
              end // attivo solo quando sono esattamente sulla route
              // (e non se fa parte di una sotto route)
            >
              <img
                src={l.iconUrl}
                alt={`${l.value} icon`}
                className="w-6 h-6"
              />
              {l.label}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </main>
  );
};
export default UserProfileLayout;
