import { CommandGroup } from "@/components/ui/command";
import { Suggestion } from "react-places-autocomplete";
import SuggestItem from "./SuggestItem";

interface SuggestsListProps {
  suggestions: readonly Suggestion[];
  suggestionItemProps: any;
  hasSeparator: boolean;
}

const SuggestsList = ({
  suggestions,
  suggestionItemProps,
  hasSeparator,
}: SuggestsListProps) => {
  return (
    <CommandGroup
      heading="Suggerimenti"
      className={`text-left font-medium text-[13px] m-[15px] mt-3 ${
        hasSeparator && "mt-2"
      }`}
    >
      {suggestions.map((s) => (
        <SuggestItem
          key={s.id}
          suggestion={s}
          suggestionItemProps={suggestionItemProps}
        />
      ))}
    </CommandGroup>
  );
};
export default SuggestsList;
