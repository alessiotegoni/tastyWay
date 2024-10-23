import { useAddress } from "@/contexts/AddressContext";
import { useToast } from "@/hooks/use-toast";
import { useGetMyAddress } from "@/lib/react-query/queries/userQueries";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type PositionType = { lat: number; lng: number } | null;

const MyLocationBtn = () => {
  const [position, setPosition] = useState<PositionType>(null);

  const { handleSetSelectedAddress } = useAddress();

  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    data: address,
    isFetching,
    isError,
    error,
  } = useGetMyAddress(position?.lat!, position?.lng!);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    if (address) {
      handleSetSelectedAddress(address);
      navigate(`/restaurants`);
    }
  }, [address, isError, error]);

  // TODO: add loading components to btn

  const handleSetMyPosition = async () => {
    if (isFetching) return;

    if (!navigator.geolocation)
      return toast({
        title: "Il tuo browser non supporta questa funzione",
        variant: "destructive",
      });

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        setPosition({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.log(err);
        const description = err.PERMISSION_DENIED
          ? "Devi accettare i permessi per poter accedere alla tua posizione"
          : "Impossibile ottenere la tua posizione";
        toast({
          title: "Errore",
          description,
          variant: "destructive",
        });
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="use-location-btn" onClick={handleSetMyPosition}>
      <img src="icons/cursor-icon.png" alt="cursos-icon" className="w-5 h-5" />
      <p className="text-[11px] font-semibold">Usa la tua posizione</p>
    </div>
  );
};
export default MyLocationBtn;
