import { Suggestion } from "react-places-autocomplete";

type SuggestItemProps = {
  suggestion: Suggestion;
  suggestionItemProps: any;
};

const SuggestItem = ({
  suggestion,
  suggestionItemProps,
}: SuggestItemProps) => {
  return (
    <li
      key={suggestion.placeId}
      className="location-suggest"
      {...suggestionItemProps(suggestion)}
    >
      <img
        src="/icons/restaurant-location-icon.png"
        alt="restaurant-location-icon"
        className="w-[20px] h-[20px]"
      />
      <p
        className={`font-medium whitespace-nowrap${
          suggestion.description.length > 55 ? "text-[10px]" : "text-[12px]"
        } `}
      >
        {suggestion.description.replace(", Italia", "")}
      </p>
    </li>
  );
};
export default SuggestItem;
