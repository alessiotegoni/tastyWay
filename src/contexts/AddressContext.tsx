import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { toast } from "@/hooks/use-toast";

interface AddressContextType {
  selectedAddress: string | null;
  handleSetSelectedAddress: (address: string) => void;
  removeSelectedAddress: () => void;
}

const AddressContext = createContext<AddressContextType | null>(null);

const AddressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

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

  // useEffect(() => {
  //   if (user?.address) handleSetSelectedAddress(user.address);
  // }, [user?.address, handleSetSelectedAddress]);

  return (
    <AddressContext.Provider
      value={{
        selectedAddress,
        handleSetSelectedAddress,
        removeSelectedAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
export default AddressProvider;

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAuth deve essere usato all'interno di AuthProvider");
  }
  return context;
};
