import { GoogleMap, Marker } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RestaurantRes } from "@/types/restaurantTypes";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

interface MapsModalProps extends Pick<RestaurantRes, "coordinates" | "name"> {}

export default function MapsModal({ name, coordinates }: MapsModalProps) {
  const center = {
    lng: coordinates[0],
    lat: coordinates[1],
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-sm font-medium text-blue-500 hover:underline
            self-start"
        >
          Vedi su mappa
        </Button>
      </DialogTrigger>
      <DialogContent className="home-widget rounded-4xl sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Mappa di Google</DialogTitle>
          <DialogDescription>
            Ecco una mappa centrata sul ristorante <b>{name}</b>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={16}
            mapTypeId={google.maps.MapTypeId.HYBRID}
            mapContainerClassName="rounded-2xl"
          >
            <Marker position={center} />
          </GoogleMap>
        </div>
      </DialogContent>
    </Dialog>
  );
}
