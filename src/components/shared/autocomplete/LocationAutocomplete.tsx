import PlacesAutocomplete, { Suggestion } from "react-places-autocomplete";
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
  shouldShowLatestResearchs?: boolean;
  className?: string;
  inputClassName?: string;
}

const searchOptions = {
  componentRestrictions: { country: "it" },
  types: ["address"],
};

const LocationAutocomplete = ({
  placeholder = "",
  shouldShowLatestResearchs = false,
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

  const { latestResearch, saveLatestResearch } = useLatestResearch(userInput);

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
  };

  const checkSeparator = (suggestions: readonly Suggestion[]) =>
    !!latestResearch.length && !!suggestions.length;

  const dropdownClasses = (sugg: readonly Suggestion[]) =>
    `location-dropdown ${
      shouldShowLatestResearchs ? "left-0 top-[105%] xs:top-[115%]" : ""
    } ${
      sugg.length ? "opacity-100 pointer-events-auto" : "pointer-events-none"
    }`;

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
        const hasSeparator = checkSeparator(suggestions);

        return (
          <div className={className}>
            <Command>
              <div className="flex-center gap-2">
                <Input
                  {...getInputProps({ placeholder })}
                  className={`widget-input text-sm sm:text-base ${
                    shouldShowLatestResearchs
                      ? "bg-transparent"
                      : "signup-form-input pr-14"
                  } ${inputClassName}`}
                />
                <XIconBtn
                  input={userInput}
                  handleRemoveInput={handleDeleteAddress}
                />
              </div>
              <CommandList className={dropdownClasses(suggestions)}>
                {shouldShowLatestResearchs && !!latestResearch.length && (
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

            {/*
            {loading &&
              Array.from({ length: 5 }, () => (
                <div className="flex items-center gap-[10px]">
                  <Skeleton className="w-10 h-7 bg-home-widget-border" />
                  <Skeleton className="w-full rounded-md h-7 bg-home-widget-border" />
                </div>
              ))} */}
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
};

export default LocationAutocomplete;
