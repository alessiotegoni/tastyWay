import useAddress from "@/hooks/useAddress";
import { filterSearchedLocations } from "@/lib/utils";
import { useEffect, useState } from "react";

type LatestResearchsType = {
  searchedLocations: string[];
  saveLatestResearch: (userAddress: string) => void;
  showLatestResearchs: boolean;
  setShowLatestResearchs: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowLatestResearchs: () => void;
  latestResearchs: string[];
};

const useLatestResearch = (
  userInput: string,
  shouldShowLatestResearchs: boolean
): LatestResearchsType => {
  const [searchedLocations, setSearchedLocations] = useState<string[]>([]);
  const [showLatestResearchs, setShowLatestResearchs] = useState(false);

  const { selectedAddress } = useAddress();

  useEffect(() => {
    if (!shouldShowLatestResearchs) return;

    const latestCities = JSON.parse(localStorage.getItem("latestCity")!) || [];

    if (
      Array.isArray(latestCities) &&
      latestCities.every((lc) => typeof lc === "string")
    )
      setSearchedLocations(latestCities);
  }, []);

  const saveLatestResearch = (userAddress: string) => {
    if (searchedLocations.includes(userAddress)) return;

    if (searchedLocations.length > 4) searchedLocations.splice(4);

    const newArr = [userAddress, ...searchedLocations];

    localStorage.setItem("latestCity", JSON.stringify(newArr));
    setSearchedLocations(newArr);
  };

  const filteredSL = filterSearchedLocations(searchedLocations, userInput);

  const isWriting = !!userInput.length;
  const canShowFilteredSL = isWriting && !!filteredSL.length;
  const canShowSearchedLocations = !isWriting && !!searchedLocations.length;

  const latestResearchs = canShowFilteredSL
    ? filteredSL
    : canShowSearchedLocations
    ? searchedLocations
    : [];

  useEffect(() => {
    if (shouldShowLatestResearchs && isWriting && !selectedAddress)
      setShowLatestResearchs(!!latestResearchs.length);
  }, [latestResearchs]);

  const handleShowLatestResearchs = () => {
    if (
      shouldShowLatestResearchs &&
      (canShowFilteredSL || canShowSearchedLocations)
    )
      setShowLatestResearchs((p) => !p);
  };

  return {
    searchedLocations,
    saveLatestResearch,
    showLatestResearchs,
    setShowLatestResearchs,
    handleShowLatestResearchs,
    latestResearchs,
  };
};
export default useLatestResearch;
