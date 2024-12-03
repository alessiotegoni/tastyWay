import PlacesAutocomplete from "react-places-autocomplete";
import { Input } from "../../ui/input";
import {
  Command,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import useAddress from "@/hooks/useAddress";
import { useFormContext } from "react-hook-form";
import LatestResearchsList from "./suggests/LatestResearchsList";
import SuggestsList from "./suggests/SuggestsList";
import useLatestResearch from "@/hooks/useLatestResearch";
import XIconBtn from "../XIconBtn";

interface LocationAutocompleteProps {
  placeholder?: string;
  shouldShowLatestResearch?: boolean;
  className?: string;
  inputClassName?: string;
}

const searchOptions = {
  componentRestrictions: { country: "it" },
  types: ["address"],
};

const LocationAutocomplete = ({
  placeholder = "",
  shouldShowLatestResearch = false,
  className = "",
  inputClassName = "",
}: LocationAutocompleteProps) => {
  const form = useFormContext<{ address: string }>();
  const formAddress = form?.watch("address");

  const { selectedAddress, handleSetSelectedAddress, removeSelectedAddress } =
    useAddress();

  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    if (formAddress) setUserInput(formAddress);

    if (!formAddress && selectedAddress) {
      setUserInput(selectedAddress);
      setFormAddress(selectedAddress);
    }
  }, [formAddress, selectedAddress]);

  const {
    latestResearch,
    saveLatestResearch,
    showSearchedLocations,
    setShowSearchedLocations,
  } = useLatestResearch(userInput, shouldShowLatestResearch);

  const setFormAddress = (
    selectedAddress: string,
    shouldDirty: boolean = false
  ) =>
    form &&
    form.setValue("address", selectedAddress, {
      shouldValidate: true,
      shouldDirty,
    });

  const handleSelect = async (value: string) => {
    const address = value?.replace(", Italia", "");

    if (!address) return;

    setUserInput(address);
    handleSetSelectedAddress(address);

    saveLatestResearch(address);

    setFormAddress(address, true);
  };

  const handleChange = (value: string) => setUserInput(value);

  const handleDeleteAddress = () => {
    handleChange("");
    removeSelectedAddress();
    setFormAddress("", true);
    setShowSearchedLocations(false);
  };

  return (
    <PlacesAutocomplete
      value={userInput}
      onChange={handleChange}
      onSelect={handleSelect}
      shouldFetchSuggestions={!!userInput}
      debounce={500}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => {
        const hasSeparator = !!latestResearch.length && !!suggestions.length;

        return (
          <div className={className}>
            <Command>
              <div className="flex-center gap-2">
                <Input
                  {...getInputProps({ placeholder })}
                  className={`widget-input text-sm sm:text-base ${
                    shouldShowLatestResearch
                      ? "bg-transparent"
                      : "signup-form-input pr-14"
                  } ${inputClassName}`}
                  onClick={() =>
                    !!latestResearch.length &&
                    setShowSearchedLocations((p) => !p)
                  }
                />
                <XIconBtn
                  input={userInput}
                  handleRemoveInput={handleDeleteAddress}
                />
              </div>
              <CommandList
                className={`location-dropdown ${
                  shouldShowLatestResearch
                    ? "left-0 top-[105%] xs:top-[115%]"
                    : ""
                } ${
                  suggestions.length || showSearchedLocations
                    ? "opacity-100 pointer-events-auto"
                    : "pointer-events-none"
                }`}
              >
                {showSearchedLocations && !!latestResearch.length && (
                  <LatestResearchsList
                    latestResearchs={latestResearch}
                    hasSeparator={hasSeparator}
                  />
                )}
                {hasSeparator && (
                  <CommandSeparator className="w-full bg-white/20" />
                )}
                {!!suggestions.length && (
                  <SuggestsList
                    suggestions={suggestions}
                    suggestionItemProps={getSuggestionItemProps}
                    hasSeparator={hasSeparator}
                  />
                )}
              </CommandList>
            </Command>
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
};

export default LocationAutocomplete;
