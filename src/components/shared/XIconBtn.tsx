interface XIconBtnProps {
  handleRemoveInput: () => void;
  input: string;
  className?: string;
}

const XIconBtn = ({ input, handleRemoveInput, className }: XIconBtnProps) => {
  return (
    <button
      type="button"
      onClick={handleRemoveInput}
      className={`x-icon
            ${input.length ? "flex" : "hidden"} ${className ?? ""}`}
    >
      <img src="icons/x-icon.png" alt="x-icon" className="w-[10px] h-[10px]" />
    </button>
  );
};
export default XIconBtn;
