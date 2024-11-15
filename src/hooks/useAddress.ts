import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const useAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState(
    localStorage.getItem("selectedAddress")
  );

  const handleSetSelectedAddress = (address: string) => {
    try {
      localStorage.setItem("selectedAddress", address);
      setSelectedAddress(address);
    } catch (err: any) {
      toast({
        title: "Errore",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const removeSelectedAddress = () => {
    localStorage.removeItem("selectedAddress");
    setSelectedAddress(null);
  };

  return { selectedAddress, handleSetSelectedAddress, removeSelectedAddress };
};

export default useAddress;
