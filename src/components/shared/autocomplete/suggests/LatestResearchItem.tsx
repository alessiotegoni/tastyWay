import useAddress from "@/hooks/useAddress";
import { useNavigate } from "react-router-dom";

type LocationLatestProps = {
  latestResearch: string;
};

const LocationLatestResearch = ({ latestResearch }: LocationLatestProps) => {
  const navigate = useNavigate();

  const { handleSetSelectedAddress } = useAddress();

  const handleClick = () => {
    handleSetSelectedAddress(latestResearch);
    navigate("/restaurants");
  };

  return (
    <li className="location-suggest" onClick={handleClick}>
      <img
        src="/icons/recent-location-icon.png"
        alt="recent-location-icon"
        className="w-[20px] h-[20px]"
      />
      <p
        className={`font-medium ${
          latestResearch.length > 55 ? "text-[10px]" : "text-[12px]"
        } `}
      >
        {latestResearch}
      </p>
    </li>
  );
};
export default LocationLatestResearch;
