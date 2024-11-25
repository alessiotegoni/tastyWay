import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const useAddress = () => {

  const { user } = useAuth()

  const [selectedAddress, setSelectedAddress] = useState(
    localStorage.getItem("selectedAddress")
  );

  useEffect(() => {
    if (user?.address) setSelectedAddress(selectedAddress)
  }, [user?.address, selectedAddress])

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
