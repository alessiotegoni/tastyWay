import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { showErrorToast } from "@/lib/utils";

const useAddress = () => {
  const { user } = useAuth();

  const [selectedAddress, setSelectedAddress] = useState(
    localStorage.getItem("selectedAddress")
  );

  useEffect(() => {
    if (user?.address && !selectedAddress)
      handleSetSelectedAddress(user.address);
  }, [user?.address]);

  const handleSetSelectedAddress = (address: string) => {
    try {
      localStorage.setItem("selectedAddress", address);
      setSelectedAddress(address);
    } catch (err: any) {
      showErrorToast({ err });
    }
  };

  const removeSelectedAddress = () => {
    localStorage.removeItem("selectedAddress");
    setSelectedAddress(null);
  };

  return { selectedAddress, handleSetSelectedAddress, removeSelectedAddress };
};

export default useAddress;
