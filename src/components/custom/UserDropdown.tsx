import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { restaurantDropdownLinks, userDropdownLinks } from "@/constants";
import { useAddress } from "@/contexts/AddressContext";
import { toast } from "@/hooks/use-toast";
import { ApiError, LogoutRes } from "@/types/apiTypes";
import { UserJwt } from "@/types/userTypes";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

interface UserDropdowenProps {
  user: UserJwt | null;
  logoutFn: UseMutateAsyncFunction<LogoutRes, ApiError, void>;
}

const UserDropdown = ({ user, logoutFn: logout }: UserDropdowenProps) => {
  const { removeSelectedAddress } = useAddress();

  const isCmpAccount = user!.isCmpAccount;
  const { pathname } = useLocation();

  const menuItems = (
    isCmpAccount ? restaurantDropdownLinks : userDropdownLinks
  ).map((l, i) => {
    const disabled =
      l.link === "/my-restaurant/orders" &&
      isCmpAccount &&
      !user?.restaurantName;

    return (
      <DropdownMenuItem
        key={i}
        className="mx-1 my-2 hover:cursor-pointer hover:underline has-[aria-disabled]:"
        disabled={disabled}
      >
        <Link
          to={disabled ? pathname : l.link}
          className="flex items-center gap-3"
          aria-disabled={disabled}
        >
          <img src={l.img} alt={l.alt} className="w-5 h-5 object-contain" />
          <p className="font-medium">{l.name}</p>
        </Link>
      </DropdownMenuItem>
    );
  });

  const handleLogout = async () => {
    await logout();
    removeSelectedAddress();
    toast({ title: "Logout effettuato con successo" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="user-btn user-btn-bg group">
        {isCmpAccount ? (
          <img src="/icons/forks-icon.png" alt="forsk-icon" />
        ) : (
          <img src="/icons/user-icon.png" alt="user-icon" />
        )}
        <p className="hidden sm:block font-semibold text-[18px]">
          {user?.restaurantName ? user.restaurantName : user!.name}
        </p>
        <img
          src="/icons/arrow-down-icon.png"
          alt="arrow-down-icon"
          className="group-aria-expanded:rotate-180 transition-transform"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="dropdown border-primary-80 rounded-[16px] mt-2
      user-btn-bg"
      >
        {menuItems}
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          className="p-2 px-3 logout-btn"
          onClick={handleLogout}
        >
          <img src="/icons/logout-door-icon.png" alt="logout-icon" />
          <p className="font-medium">Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;
