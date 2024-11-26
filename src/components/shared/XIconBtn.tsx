import { XIcon } from "lucide-react";

interface XIconBtnProps {
  handleRemoveInput: () => void;
  input: string;
  className?: string;
}

const XIconBtn = ({
  input = "",
  handleRemoveInput,
  className = "",
}: XIconBtnProps) => (
  <button
    type="button"
    onClick={handleRemoveInput}
    className={`x-icon
            ${input.length ? "flex" : "hidden"} ${className}`}
  >
    <XIcon className="w-[10px] h-[10px]" />
  </button>
);

export default XIconBtn;
