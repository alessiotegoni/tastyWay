import { useState } from "react";
import { errorToast } from "@/lib/utils";

const useAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState(
    localStorage.getItem("selectedAddress")
  );

  const handleSetSelectedAddress = (address: string) => {
    try {
      localStorage.setItem("selectedAddress", address);
      setSelectedAddress(address);
    } catch (err: any) {
      errorToast({ err });
    }
  };

  const removeSelectedAddress = () => {
    localStorage.removeItem("selectedAddress");
    setSelectedAddress(null);
  };

  return { selectedAddress, handleSetSelectedAddress, removeSelectedAddress };
};

export default useAddress;
