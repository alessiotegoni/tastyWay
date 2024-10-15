import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userDropdownLinks } from "@/constants";
import { useAddress } from "@/contexts/AddressContext";
import { toast } from "@/hooks/use-toast";
import { ApiError, LogoutRes } from "@/types/apiTypes";
import { UserJwt } from "@/types/userTypes";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface UserDropdowenProps {
  user: UserJwt | null;
  logoutFn: UseMutateAsyncFunction<LogoutRes, ApiError, void>;
}

// FIXME: try to fix figma bg-color

const UserDropdown = ({ user, logoutFn: logout }: UserDropdowenProps) => {
  const { removeSelectedAddress } = useAddress();

  const items = userDropdownLinks.map((i, index) => (
    <DropdownMenuItem
      key={index}
      className="mx-1 my-2 hover:cursor-pointer hover:underline"
    >
      <Link to={i.link} className="flex items-center gap-3">
        <img src={i.img} alt={i.alt} />
        <p className="font-medium">{i.name}</p>
      </Link>
    </DropdownMenuItem>
  ));

  const handleLogout = async () => {
    await logout();
    removeSelectedAddress();
    toast({ title: "Logout effettuato con successo" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="user-btn user-btn-bg">
        <img src="/icons/user-icon.png" alt="user-icon" />

        <p className="font-semibold text-[18px]">{user?.name}</p>
        <img src="/icons/arrow-down-icon.png" alt="arrow-down-icon" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="dropdown border-primary-80 rounded-[16px] mt-2
      user-btn-bg"
      >
        {items}
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
