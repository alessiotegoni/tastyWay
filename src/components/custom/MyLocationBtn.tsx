import { useGetMyAddress } from "@/lib/react-query/queries/userQueries";
import { errorToast } from "@/lib/utils";
import { useState } from "react";

type PositionType = { lat: number; lng: number } | null;

interface MyLocationBtnProps {
  className: string;
}

const MyLocationBtn = ({ className }: MyLocationBtnProps) => {
  const [position, setPosition] = useState<PositionType>(null);

  const { isFetching } = useGetMyAddress(position?.lat!, position?.lng!);

  const handleSetMyPosition = async () => {
    if (isFetching) return;

    if (!navigator.geolocation)
      return errorToast({
        description: "Il tuo browser non supporta questa funzione",
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
        errorToast({ description });
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div
      className={`use-location-btn ${className}`}
      onClick={handleSetMyPosition}
    >
      <img src="icons/cursor-icon.png" alt="cursos-icon" className="w-5 h-5" />
      <p className="hidden xs:block text-[11px] font-semibold">
        Usa la tua posizione
      </p>
    </div>
  );
};
export default MyLocationBtn;
