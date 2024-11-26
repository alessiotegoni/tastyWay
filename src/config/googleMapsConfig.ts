import { showErrorToast } from "@/lib/utils";
import { LoadScriptProps } from "@react-google-maps/api";

const googleMapsApiKey: string = import.meta.env
  .VITE_GOOGLE_MAPS_API_KEY;

const onError = (err: Error) =>
  showErrorToast({
    err,
    description: "Errore nel caricamento delle mappe di google",
  });

export const googleMapsConfigs: LoadScriptProps = {
  id: "googleMaps",
  googleMapsApiKey,
  libraries: ["places"],
  language: "it",
  onError,
};
