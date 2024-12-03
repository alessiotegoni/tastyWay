import { useEffect, useState } from "react";

const useLatestResearch = (
  userInput: string,
  shouldShowLatestResearch: boolean
) => {
  const [searchedLocations, setSearchedLocations] = useState<string[]>(
    JSON.parse(localStorage.getItem("latestResearch")!) ?? []
  );
  const [showSearchedLocations, setShowSearchedLocations] = useState(false);

  useEffect(() => {
    if (
      !Array.isArray(searchedLocations) ||
      !searchedLocations.every((sl) => typeof sl === "string")
    )
      setSearchedLocations([]);
  }, [searchedLocations]);

  const saveLatestResearch = (address: string) => {
    if (searchedLocations.includes(address)) return;

    if (searchedLocations.length > 4) searchedLocations.splice(4);

    const newArr = [address, ...searchedLocations];

    localStorage.setItem("latestResearch", JSON.stringify(newArr));
    setSearchedLocations(newArr);
  };

  const latestResearch = shouldShowLatestResearch
    ? searchedLocations.filter((sl) =>
        sl.toLowerCase().trim().includes(userInput.toLowerCase().trim())
      )
    : [];

  return {
    latestResearch,
    saveLatestResearch,
    showSearchedLocations,
    setShowSearchedLocations,
  };
};
export default useLatestResearch;
